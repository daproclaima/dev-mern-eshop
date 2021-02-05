import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
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

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/products", productRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(
  PORT,
  console.log(`server running in ${env} mode on port ${PORT}`.yellow.bold)
);
