require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDb = require("./database/db");

const app = express();

// Importing routes
const articleRouter = require("./routes/article.routes");
const profileRouter = require("./routes/profile.routes");
const advertisementRouter = require("./routes/advertisement.routes");
const visitorRouter = require("./routes/visitor.routes");

// Connect to the database
connectDb();

// Handling CORS policy issue which occurs due to run two diffrent servers for frontend or backend
const corsOptions = {
  origin: process.env.BASE_URL,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200, // For legacy browser support
};

app.use(cors(corsOptions));

// Middlewares
app.use(express.json()); // Middleware for parsing JSON bodies

// Middleware to serve static files from the "uploads" directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API routes
app.use("/api", articleRouter);
app.use("/api", profileRouter);
app.use("/api", advertisementRouter);
app.use("/api", visitorRouter);

// Root route
app.get("/", (req, res) => {
  res.send("This server is created by Anshuman Sinha");
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
