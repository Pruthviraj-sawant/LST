const mongoose = require('mongoose');

const BookingSchema=new mongoose.Schema({

    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },

    workerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Worker',
        required: true
    },

    serviceType: {
        type: String,
        required: true
    },

    bookingDate: {
        type: Date,
        required: true
    },
    bookingTime: {
        type: String,
        required: true
    },
    timeSlot: {
        type: String,
        required: false
    },
    status: {   
        type: String,
        enum: ['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'],
        default: 'PENDING'
    },
    amount: {
        type: Number,
        required: true
    },

    pricingBreakdown: {
        visitCharge: Number,
        serviceCharge: Number,
        workType: String
    },
    platformFee: {
        type: Number,
        default: 0
    },
    workerEarnings: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }



}, { timestamps: true });   

module.exports=mongoose.model("Booking",BookingSchema);