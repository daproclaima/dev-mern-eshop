import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // eslint-disable-next-line no-unused-vars
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });

    // console.log(process.env.MONGO_URI);
    // console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline);
  } catch (e) {
    console.error(`Error: ${e.message}`.red.bold);
    process.exit(1);
  }
};

export default connectDB;
