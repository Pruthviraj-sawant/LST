const ratingAndReviewSchema = new mongoose.Schema({
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
    default: null   // ✅ IMPORTANT
  },

  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },

  review: {
    type: String,
    trim: true
  }
}, { timestamps: true });

module.exports = mongoose.model('RatingAndReview', ratingAndReviewSchema);