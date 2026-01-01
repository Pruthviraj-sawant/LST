const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },

  password: {
    type: String,
    required: true
  },

  phone: {
    type: String,
    unique: true,
    sparse: true
  },

  role: {
    type: String,
    enum: ["ADMIN"],
    default: "ADMIN"
  },

  permissions: {
    type: [String],
    default: ["all"]
  },

  isActive: {
    type: Boolean,
    default: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
