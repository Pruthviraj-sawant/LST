const mongoose =require('mongoose');

const ratingAndReviewSchema=new mongoose.Schema({

    bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        required: true
    },
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
    rating: {
        type: Number,
        required: true,
        min: 1,                 
        max: 5
    },
    review: {
        type: String,       
        trim: true
    },
},
{ timestamps: true }
);

module.exports=mongoose.model("RatingAndReview",ratingAndReviewSchema);