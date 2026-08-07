import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

// Cache the connection across hot reloads (dev) and across warm serverless
// invocations (Vercel). Without this, every request would open a new
// connection and quickly exhaust the Atlas connection pool.
let cached = global._mongoose;
if (!cached) {
  cached = global._mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined in the environment.");
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 10000,
      })
      .then((m) => m)
      .catch((error) => {
        // Reset so the next request can retry instead of caching a failure.
        cached.promise = null;
        throw error;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;
