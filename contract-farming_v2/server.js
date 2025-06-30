const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const contractRoutes = require("./routes/contract");
const authMiddleware = require("./middleware/auth"); // Add this for JWT verification
const cors = require("cors");

dotenv.config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Authentication Routes
app.use("/api/auth", authRoutes);

// Contract Routes
app.use("/api/contract", contractRoutes);

// Basic route to check API
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
