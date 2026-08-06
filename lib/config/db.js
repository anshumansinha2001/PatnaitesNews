import mongoose from "mongoose";

const connection = {};

async function connectDB() {
  // Check if we have a connection to the database or if it's currently connecting
  if (connection.isConnected) {
    console.log("Already connected to the database");
    return;
  }

  try {
    // Attempt to connect to the database
    const db = await mongoose.connect(process.env.MONGODB_URI);

    connection.isConnected = db.connections[0].readyState;

    console.log("Database connected successfully");
  } catch (error) {
    console.error("Failed to connect Database:", error);

    // Reset the flag so the next request can retry the connection
    // instead of crashing the whole process (which killed dev/build workers).
    connection.isConnected = false;
  }
}

export default connectDB;
