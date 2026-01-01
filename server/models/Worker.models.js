const mongoose = require('mongoose');
const workerSchema=new mongoose.Schema({

name: {
    type: String,
    required: true,
    trim: true
  },

  phone: {
    type: String,
    required: true,
    unique: true
  },

  email:{
    type: String,
    trim: true,
    lowercase: true
  },

    password: {
    type: String,
    required: true
    },
    
  role: {
    type: String,
    enum: ["WORKER"],
    default: "WORKER"
  },

  serviceType: {
    type: String,
    required: true,
    enum: ["PLUMBER", "ELECTRICIAN", "CARPENTER", "PAINTER", "CLEANER", "OTHER"],
    default: "OTHER"
  },

  description: {
    type: String,
    trim: true
    },

 charges: {
  visitCharge: {
    type: Number,
    default: 0
  },
  services: [
    {
      workType: {
        type: String, // "Leakage", "Fitting", "Installation"
        required: true
      },
      price: {
        type: Number,
        required: true
      }
    }
  ]
},

  isVerified: {
    type: Boolean,
    default: false
  },

  rating: {
    average: {
      type: Number,
      default: 0
    },
    totalRatings: {
      type: Number,
      default: 0
    }
  },

  totalJobs: {
    type: Number,
    default: 0
  },

  earnings: {
    total: {
      type: Number,
      default: 0
    }
  },

  location: {
    city: String,
    coordinates: {
      type: [Number],
      index: "2dsphere"
    }
  },

  isActive: {
    type: Boolean,
    default: true
  }

}, { timestamps: true } );

module.exports=mongoose.model("Worker",workerSchema);