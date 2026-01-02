const mongoose=require('mongoose');

const CustomerSchema=new mongoose.Schema({



 name: {
    type: String,
    required: true,
    trim: true
  },
  
  email: {
    type: String,
    trim: true,
    lowercase: true
  },

  password: {
    type: String,
    required: true
  },

  phone: {
    type: String,
    required: true,
    unique: true
  },

  role: {
    type: String,
    enum: ["USER"],
    default: "USER"
  },

  location: {
    city: {
      type: String
    },
    area: {
      type: String
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      index: "2dsphere"
    }
  },
profileImage: {
  url: {
    type: String,
    default: ""
  },
  publicId: {
    type: String,
    default: ""
  }
},
  isActive: {
    type: Boolean,
    default: true
  }

},

{ timestamps: true }
);
module.exports=mongoose.model("Customer",CustomerSchema);