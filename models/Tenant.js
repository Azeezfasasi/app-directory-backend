const mongoose = require("mongoose");

const tenantSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  tenantCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: "TenantCategory", required: true },
});

module.exports = mongoose.model('Tenant', tenantSchema);
