const TenantCategory = require("../models/TenantCategory");

// Create a new tenant category
const createTenantCategory = async (req, res) => {
    try {
      console.log("Received data:", req.body); // Debugging
      const { name } = req.body;
  
      if (typeof name !== "string") {
        return res.status(400).json({ message: "Invalid data format: name must be a string" });
      }
  
      const newCategory = await TenantCategory.create({ name: name.trim() });
      res.status(201).json(newCategory);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  

// Get all tenant categories
const getAllTenantCategories = async (req, res) => {
  try {
    const categories = await TenantCategory.find();
    console.log("Sending categories:", categories); // Debugging
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a tenant category by ID
const getTenantCategoryById = async (req, res) => {
  try {
    const category = await TenantCategory.findById(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a tenant category
// const updateTenantCategory = async (req, res) => {
//   try {
//     const { id } = req.params;
    
//     if (!id) {
//       return res.status(400).json({ message: "ID is required" });
//     }

//     const updatedCategory = await TenantCategory.findByIdAndUpdate(id, req.body, { new: true });

//     if (!updatedCategory) {
//       return res.status(404).json({ message: "Category not found" });
//     }

//     res.json(updatedCategory);
//   } catch (error) {
//     res.status(500).json({ message: "Error updating category", error: error.message });
//   }
// };
const updateTenantCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    if (!id) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    const updatedCategory = await TenantCategory.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: "Error updating category", error: error.message });
  }
};



// Delete a tenant category
const deleteTenantCategory = async (req, res) => {
  try {
    const deletedCategory = await TenantCategory.findByIdAndDelete(req.params.id);
    if (!deletedCategory) return res.status(404).json({ message: "Category not found" });
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

  module.exports = {
    createTenantCategory,
    getAllTenantCategories,
    getTenantCategoryById,
    updateTenantCategory,
    deleteTenantCategory,
  };