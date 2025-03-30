const express = require("express");
const { getAppsByTenant, getAllApps, createApp, updateApp, deleteApp } = require("../controllers/appController");

const router = express.Router();

// Get all apps
router.get("/", getAllApps); // GET /api/apps

// Get all apps for a tenant
router.get("/:tenantId", getAppsByTenant); // GET /api/apps/:tenantId

// Add a new app
router.post("/", createApp); // POST /api/apps

// Update an app
router.put("/:appId", updateApp); // PUT /api/apps/:appId

// Delete an app
router.delete("/:appId", deleteApp); // DELETE /api/apps/:appId

module.exports = router;
