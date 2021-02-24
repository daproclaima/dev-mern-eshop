import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// @desc Fetch all products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 8;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  // res.status(401);
  // throw new Error("Not authorized");
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @desc Fetch single product
// @route GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    return res.json(product);
  }
  res.status(404);
  throw new Error("Product not found");
});

// @desc Delete single product
// @route DEL /api/products/:id
// @access PRIVATE/ADMIN
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  // TODO: delete image in storage

  if (product) {
    await product.remove();
    res.json({ message: "product removed" });
  } else {
    res.status(404);
    throw new Error("product not found");
  }
});

// @desc Create single product
// @route POST /api/products
// @access PRIVATE/ADMIN
const createProduct = asyncHandler(async (req, res) => {
  const product = await new Product({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/uploads/sample.webp",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
    rating: 0,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc Edit single product
// @route PUT /api/products/:id
// @access PRIVATE/ADMIN
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, brand, category, description, image } = req.body;
  const product = await Product.findById(req.params.id);
  // TODO: set a logger for errors
  if (product) {
    product.name = name || product.name;
    product.price = price || product.price;
    product.brand = brand || product.brand;
    product.category = category || product.category;
    product.image = image || product.image;
    product.description = description || product.description;

    const updatedProduct = await product.save();

    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("product not found");
  }
});

// @desc Create review
// @route POST /api/products/:id/reviews
// @access PRIVATE
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  // TODO: set a logger for errors

  if (product) {
    // TODO: check user ordered and received this product
    const isAlreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    if (isAlreadyReviewed) {
      res.status(400);
      throw new Error("You already evaluated this product.");
    }
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
      createdAt: Date(),
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("product not found");
  }
});

// @desc Get top rated products
// @route GET /api/products/top
// @access Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);
  res.json(products);
});

export {
  getProductById,
  getProducts,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
};
