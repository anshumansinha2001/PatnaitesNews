import dotenv from "dotenv";
dotenv.config();
import path from "path";
import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import connectDb from "./database/db.js";

// Importing routes
import articleRouter from "./routes/article.routes.js";
import profileRouter from "./routes/profile.routes.js";
import advertisementRouter from "./routes/advertisement.routes.js";
import visitorRouter from "./routes/visitor.routes.js";

const app = express();

// CORS configuration
const corsOptions = {
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Middlewares
app.use(express.json()); // Parse JSON bodies

// Determine the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the "uploads" directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API routes
app.use("/api", articleRouter);
app.use("/api", profileRouter);
app.use("/api", advertisementRouter);
app.use("/api", visitorRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Serve static files from the "dist" directory
app.use(express.static(path.join(__dirname, "../client/dist")));

// Fallback route to serve the main HTML file for unknown routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
});

// Start the server
const PORT = process.env.PORT || 8000;
connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  });
