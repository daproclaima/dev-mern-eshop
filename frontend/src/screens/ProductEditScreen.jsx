import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { listProductDetails } from "../actions/productActions";

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );
  // const {
  //   loading: loadingUpdate,
  //   error: errorUpdate,
  //   success: successUpdate,
  // } = useSelector((state) => state.productUpdate);

  useEffect(() => {
    if (!product.name || product._id !== productId) {
      dispatch(listProductDetails(productId));
    } else {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product, productId, history, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    // update product
  };
  return (
    <>
      <Link to={"/admin/productlist"} className={"btn btn-light my-3"}>
        Go Back to User List
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {/*{loadingUpdate && <Loader />}*/}
        {/*{errorUpdate && <Message variant={"danger"}>{errorUpdate}</Message>}*/}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant={"danger"}>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId={"name"}>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type={"name"}
                placeholder={"Enter product name"}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId={"price"}>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type={"number"}
                placeholder={"Enter Price"}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId={"image"}>
              <Form.Label>Image</Form.Label>
              {/* TODO set a true image with formater */}
              <Form.Control
                type={"text"}
                placeholder={"Enter product image url"}
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId={"brand"}>
              <Form.Label>Brand name</Form.Label>
              <Form.Control
                type={"text"}
                placeholder={"Enter product brand name"}
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId={"countInStock"}>
              <Form.Label>Count in stock</Form.Label>
              <Form.Control
                type={"number"}
                placeholder={"Enter Count in stock"}
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId={"category"}>
              <Form.Label>Category name</Form.Label>
              <Form.Control
                type={"text"}
                placeholder={"Enter product category name"}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId={"description"}>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type={"text"}
                placeholder={"Enter product description"}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Button type={"submit"} variant={"primary"}>
              Update product
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

// check, login error when wrong email/password,
// when login redirect, local storage and store have user info
export default ProductEditScreen;
