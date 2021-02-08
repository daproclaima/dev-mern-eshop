import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";

// Routes
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

// Middlewares
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;
const env = process.env.NODE_ENV || "development";

// app.use((req, res, next) => {
//     console.log(req.originalUrl)
//     next()
// })

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

// doc for paypal
// https://developer.paypal.com/docs/business/javascript-sdk/javascript-sdk-configuration/#query-parameters
// TODO: specific utils setting params query (currency, merchand ID...)
app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

app.use(notFound);
app.use(errorHandler);

app.listen(
  PORT,
  console.log(`server running in ${env} mode on port ${PORT}`.yellow.bold)
);
