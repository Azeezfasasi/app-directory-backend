const Tenant = require("../models/Tenant");

// Get all tenants
const getAllTenants = async (req, res) => {
  try {
    const { categoryId } = req.query;
    
    const query = categoryId ? { tenantCategoryId: categoryId } : {};
    const tenants = await Tenant.find(query);

    res.json(tenants);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tenants" });
  }
};

// Get tenants by ID
const getTenantById = async (req, res) => {
  try {
    const tenant = await Tenant.findById(req.params.tenantId);
    if (!tenant) {
      return res.status(404).json({ message: "Tenant not found" });
    }
    res.json(tenant);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


  // Get tenants
const getTenantApps = async (req, res) => {
    try {
      const { tenantId } = req.params;
      const apps = await App.find({ tenantId });
      res.status(200).json(apps);
    } catch (error) {
      res.status(500).json({ error: "Error fetching apps for tenant" });
    }
  };

// Create a tenant
const createTenant = async (req, res) => {
  try {
    const { name, description, tenantCategoryId } = req.body;
    const newTenant = new Tenant({ name, description, tenantCategoryId });
    await newTenant.save();
    res.status(201).json(newTenant);
  } catch (error) {
    console.error("Create Tenant Error:", error);
    res.status(500).json({ error: "Error creating tenant" });
  }
};

// Update a tenant
const updateTenant = async (req, res) => {
  try {
    const { tenantId } = req.params;
    const { name, description } = req.body;

    // Ensure required fields exist
    if (!name || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Update the tenant
    const updatedTenant = await Tenant.findByIdAndUpdate(
      tenantId,
      { name, description },
      { new: true, runValidators: true } // Return updated data and run validation
    );

    if (!updatedTenant) {
      return res.status(404).json({ message: "Tenant not found" });
    }

    res.status(200).json(updatedTenant);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


  // Delete a tenant
const deleteTenant = async (req, res) => {
  try {
    const { tenantId } = req.params;
    const deletedTenant = await Tenant.findByIdAndDelete(tenantId);

    if (!deletedTenant) {
      return res.status(404).json({ message: "Tenant not found" });
    }

    res.status(200).json({ message: "Tenant deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting tenant", error });
  }
  };

  module.exports = {
    getAllTenants,
    createTenant,
    updateTenant,
    deleteTenant,
    getTenantApps,
    getTenantById,
  };