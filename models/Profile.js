const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  role: {
    type: String,
    enum: ["Admin", "Viewer"],
    default: "Viewer",
  },
});

// Hash password before saving
profileSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  // console.log("Original password before hashing:", this.password);
  
  this.password = await bcrypt.hash(this.password, 10);
  
  // console.log("Hashed password after hashing:", this.password);

  next();
});



// Compare password for login
profileSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("Profile", profileSchema);
