import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

// execute these functions by adding them in package.json
// "data:import": "node ./apiendpoints/seeder",
// "data:destroy": "node ./apiendpoints/seeder -d"

const importData = async () => {
  try {
    await Order.deleteMany();
    await User.deleteMany();
    await Product.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUserId = createdUsers[0]._id;

    const sampleProducts = products.map((product) => ({
      ...product,
      user: adminUserId,
    }));
    console.log("Data to import");
    console.log(JSON.parse(JSON.stringify(sampleProducts)));

    await Product.insertMany(sampleProducts);

    console.log("Data imported".green.inverse);
    process.exit();
  } catch (e) {
    console.log(`${e}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await User.deleteMany();
    await Product.deleteMany();

    console.log("Data destroyed".yellow.inverse);
    process.exit();
  } catch (e) {
    console.log(`${e}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
