import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// Construct the MongoDB connection URL
const url = process.env.MONGO_URI;
// Function to connect to the MongoDB database
const connectDb = async () => {
  try {
    await mongoose.connect(url);
    console.log("Successfully Connected to Database!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    console.error(error.stack);
  }
};

export default connectDb;
