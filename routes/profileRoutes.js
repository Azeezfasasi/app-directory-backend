const express = require("express");
const {
  registerProfile,
  loginProfile,
  getProfileById,
  updateProfile,
  deleteProfile,
  getCurrentUserProfile,
  getAllProfiles,
  addUserByAdmin,
} = require("../controllers/profileController");
const authenticateUser = require("../middleware/authenticateUser");

const router = express.Router();

// Public Routes
router.post("/register", registerProfile); // POST /api/profiles/register
router.post("/login", loginProfile); // POST /api/profiles/login

// Protected Routes (Require JWT Authentication)
router.get("/:userId", authenticateUser, getProfileById); // GET /api/profiles/:userId
router.put("/:userId", authenticateUser, updateProfile); // PUT /api/profiles/:userId
router.delete("/:userId", authenticateUser, deleteProfile); // DELETE /api/profiles/:userId
router.get("/me", authenticateUser, getCurrentUserProfile); // GET /api/profiles/me
router.get("/", authenticateUser, getAllProfiles); // GET /api/profiles/

// Add user by admin (Protected, only Admins)
router.post("/admin/add-user", authenticateUser, addUserByAdmin); // POST /api/profiles/admin/add-user

module.exports = router;
