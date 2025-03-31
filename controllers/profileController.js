const Profile = require("../models/Profile");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/jwt.js");

// Helper function to sanitize inputs
const sanitizeInput = (input) => input?.trim();

// Register a new user
const registerProfile = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Ensure no pre-hashing here; Mongoose middleware will handle it
    const newUser = new Profile({
      name,
      email,
      password, // Plain-text password
      role,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Login user
const loginProfile = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await Profile.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Generate token
    const token = generateToken(user);

    res.json({ token, user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get Current Logged-In User Profile
const getCurrentUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "Profile not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get all profiles
const getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().select("-password"); // Exclude passwords
    res.status(200).json(profiles);
  } catch (error) {
    console.error("Error fetching profiles:", error);
    res.status(500).json({ error: "Error fetching profiles" });
  }
};

// Get profile by ID
const getProfileById = async (req, res) => {
  try {
    const { userId } = req.params;
    const profile = await Profile.findById(userId).select("-password");
    if (!profile) return res.status(404).json({ error: "Profile not found" });

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ error: "Error fetching profile" });
  }
};

// Update profile
const updateProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, email, password, role, disabled } = req.body;

    const updatedProfile = await Profile.findById(userId);
    if (!updatedProfile) return res.status(404).json({ error: "Profile not found" });

    if (name) updatedProfile.name = sanitizeInput(name);
    if (email) updatedProfile.email = sanitizeInput(email);

    // Hash password if updated
    if (password) {
      updatedProfile.password = await bcrypt.hash(password, 10);
    }

    if (role) updatedProfile.role = role;

    // ✅ Handle disabling user
    if (disabled !== undefined) {
      updatedProfile.disabled = disabled;
    }

    await updatedProfile.save();

    res.status(200).json({
      message: "Profile updated successfully",
      updatedProfile: {
        id: updatedProfile._id,
        name: updatedProfile.name,
        role: updatedProfile.role,
        disabled: updatedProfile.disabled,
      },
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Error updating profile" });
  }
};


// Delete profile
const deleteProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    await Profile.findByIdAndDelete(userId);
    res.status(200).json({ message: "Profile deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting profile" });
  }
};

// Admin: Add a new user
const addUserByAdmin = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await Profile.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    // Create new user
    const newUser = new Profile({
      name,
      email,
      password, 
      role,
    });

    await newUser.save();

    res.status(201).json({ message: "User added successfully", user: newUser });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  registerProfile,
  loginProfile,
  getProfileById,
  updateProfile,
  deleteProfile,
  getCurrentUserProfile,
  getAllProfiles,
  addUserByAdmin,
};