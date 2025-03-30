// routes/tenantCategoryRoutes.js

const express = require("express");
const router = express.Router();
const {
  createTenantCategory,
  getAllTenantCategories,
  getTenantCategoryById,
  updateTenantCategory,
  deleteTenantCategory,
} = require("../controllers/tenantCategoryController");

// Create a new tenant category
router.post("/", createTenantCategory); // POST /api/tenant-categories

// Get all tenant categories
router.get("/", getAllTenantCategories); // GET /api/tenant-categories

// Get a specific tenant category by ID
router.get("/:id", getTenantCategoryById); // GET /api/tenant-categories/:id

// Update a tenant category
router.put("/:id", updateTenantCategory); // PUT /api/tenant-categories/:id

// Delete a tenant category
router.delete("/:id", deleteTenantCategory); // DELETE /api/tenant-categories/:id

module.exports = router;
