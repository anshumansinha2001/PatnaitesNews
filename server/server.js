import dotenv from "dotenv";
dotenv.config();
import path from "path";
import express from "express";
import cors from "cors";
import connectDb from "./database/db.js";
import { fileURLToPath } from "url";

// Importing routes
import articleRouter from "./routes/article.routes.js";
import profileRouter from "./routes/profile.routes.js";
import advertisementRouter from "./routes/advertisement.routes.js";
import visitorRouter from "./routes/visitor.routes.js";

const app = express();

// Handling CORS policy issue which occurs due to running two different servers for frontend or backend
const corsOptions = {
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200, // For legacy browser support
};
app.use(cors(corsOptions));

// Middlewares
app.use(express.json()); // Middleware for parsing JSON bodies

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware to serve static files from the "uploads" directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API routes
app.use("/api", articleRouter);
app.use("/api", profileRouter);
app.use("/api", advertisementRouter);
app.use("/api", visitorRouter);

// Enhanced error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, "../client/dist")));

// Serve the main HTML file for any other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  // Connect to the database
  connectDb();
  console.log(`Server running at http://localhost:${PORT}`);
});
