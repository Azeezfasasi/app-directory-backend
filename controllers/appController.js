const App = require("../models/App.js");

// Get all apps
const getAllApps = async (req, res) => {
  try {
    const apps = await App.find(); // Fetch all apps
    res.status(200).json(apps);
  } catch (error) {
    res.status(500).json({ message: "Error fetching apps", error });
  }
};

// Get all apps for a specific tenant
const getAppsByTenant = async (req, res) => {
  try {
    console.log("Received tenantId:", req.params.tenantId); // Debugging

    if (!req.params.tenantId) {
      return res.status(400).json({ error: "Missing tenantId parameter" });
    }

    const apps = await App.find({ tenantId: req.params.tenantId });

    console.log("Apps found:", apps);
    
    res.status(200).json(apps);
  } catch (error) {
    console.error("Error fetching apps:", error);
    res.status(500).json({ error: "Failed to fetch apps" });
  }
};


// Create an app
const createApp = async (req, res) => {
    try {
      const { name, description, tenantId, link } = req.body;
      const newApp = new App({ name, description, tenantId, link });
      await newApp.save();
      res.status(201).json(newApp);
    } catch (error) {
      res.status(500).json({ error: "Error creating app" });
    }
  };

// Update an app
const updateApp = async (req, res) => {
    try {
      const { appId } = req.params;
      const updatedApp = await App.findByIdAndUpdate(appId, req.body, { new: true });
      res.status(200).json(updatedApp);
    } catch (error) {
      res.status(500).json({ error: "Error updating app" });
    }
  };

// Delete an app
const deleteApp = async (req, res) => {
    try {
      const { appId } = req.params;
      await App.findByIdAndDelete(appId);
      res.status(200).json({ message: "App deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting app" });
    }
  };

// Get app details
const getAppById = async (req, res) => {
  try {
    const app = await App.findById(req.params.appId).populate('tenant');
    if (!app) return res.status(404).json({ error: 'App not found' });
    res.status(200).json(app);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

module.exports = {
  getAllApps,
  createApp,
  updateApp,
  deleteApp,
  getAppById,
  getAppsByTenant,
};