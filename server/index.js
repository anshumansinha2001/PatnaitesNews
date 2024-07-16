require("dotenv").config();
const express = require("express");
const cors = require("cors");
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
const corsOption = {
  origin: process.env.BASE_URL,
  method: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};
app.use(cors(corsOption));

// Middlewares
app.use(express.json()); // Middleware for parsing JSON bodies

// API routes
app.use("/api", articleRouter);
app.use("/api", profileRouter);
app.use("/api", advertisementRouter);
app.use("/api", visitorRouter);

// Root route
app.get("/", (req, res) => {
  res.send("This is created by Anshuman Sinha");
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
