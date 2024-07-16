const mongoose = require("mongoose");

// const url = process.env.MONGODB_URL;
const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.tgei7xv.mongodb.net/Newsdb?retryWrites=true&w=majority&appName=Cluster0`;

const connectDb = async () => {
  try {
    await mongoose.connect(url);
    console.log("Successfully Connected to Database!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    console.error(error.stack);
  }
};

module.exports = connectDb;
