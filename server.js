const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const tenantRoutes = require("./routes/tenantRoutes");
const appRoutes = require("./routes/appRoutes");
const profileRoutes = require("./routes/profileRoutes");
const tenantCategoryRoutes = require("./routes/tenantCategoryRoutes");
const cors = require("cors");

dotenv.config(); // Load environment variables

const app = express();

// Define allowed origins for CORS
const allowedOrigins = [
  "http://localhost:5173", // Development frontend
  "https://website-directory.netlify.app" // Production frontend
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

// MongoDB Connection
const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in .env file");
    }
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};

connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/api/tenants", tenantRoutes);
app.use("/api/apps", appRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/tenant-categories", tenantCategoryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));