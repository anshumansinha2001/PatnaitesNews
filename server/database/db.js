import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// Construct the MongoDB connection URL
const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.tgei7xv.mongodb.net/Newsdb?retryWrites=true&w=majority&appName=Cluster0`;

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
