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

const corsOptions = {
  origin: 'http://localhost:5173', // Allow your frontend URL
  credentials: true,               // Allow cookies or authorization headers
};

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
app.use(cors(corsOptions));

// Routes
app.use("/api/tenants", tenantRoutes);
app.use("/api/apps", appRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/tenant-categories", tenantCategoryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));