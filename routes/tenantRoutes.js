const express = require("express");
const {
  getAllTenants,
  createTenant,
  updateTenant,
  deleteTenant,
  getTenantApps,
  getTenantById,
} = require("../controllers/tenantController");

const router = express.Router();

// Tenant Routes
router.get("/", getAllTenants); // GET /api/tenants
router.post("/", createTenant); // POST /api/tenants
router.put("/:tenantId", updateTenant); // PUT /api/tenants/:tenantId
router.delete("/:tenantId", deleteTenant); // DELETE /api/tenants/:tenantId
router.get("/:tenantId", getTenantById); // GET /api/tenants/:tenantId

// Get Apps for a specific tenant
router.get("/:tenantId/apps", getTenantApps); // GET /api/tenants/:tenantId/apps

module.exports = router;
