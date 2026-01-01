const mongoose = require('mongoose');
const Rating = require('../models/RatingAndReview.models.js');
const Booking = require('../models/Booking.models.js');

exports.createRating = async (req, res) => {
  try {
    const { bookingId, rating, review } = req.body;
    const customerId = req.user.userId;

    // 1. Check booking exists & belongs to user
    const booking = await Booking.findOne({
      _id: bookingId,
      customerId,
      status: "COMPLETED"
    });

    if (!booking) {
      return res.status(400).json({
        message: "Invalid or incomplete booking"
      });
    }

    // 2. Prevent multiple ratings for same booking
    const exists = await Rating.findOne({
      bookingId,
      customerId
    });

    if (exists) {
      return res.status(400).json({
        message: "You have already rated this booking"
      });
    }

    // 3. Create website rating (workerId = null)
    const ratingDoc = await Rating.create({
      bookingId,
      customerId,
      rating,
      review,
      workerId: null
    });

    res.status(201).json(ratingDoc);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.craeteRatingForWorker = async (req, res) => {
  try {
    const { workerId } = req.params;
    const { bookingId, rating, review } = req.body;
    const customerId = req.user.userId;

    // 1. Validate booking
    const booking = await Booking.findOne({
      _id: bookingId,
      customerId,
      workerId,
      status: "COMPLETED"
    });

    if (!booking) {
      return res.status(400).json({
        message: "Booking not completed or invalid"
      });
    }

    // 2. Prevent duplicate rating
    const exists = await Rating.findOne({
      bookingId,
      customerId
    });

    if (exists) {
      return res.status(400).json({
        message: "You have already rated this booking"
      });
    }

    // 3. Create rating
    const ratingDoc = await Rating.create({
      bookingId,
      customerId,
      workerId,
      rating,
      review
    });

    res.status(201).json(ratingDoc);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get all ratings for admin
exports.getRatings = async (req, res) => {
  try {
    const ratings = await Rating.find();
    res.json(ratings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



exports.getRatingsForWorker = async (req, res) => {
  try {
    const { workerId } = req.params;

    // 1. Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(workerId)) {
      return res.status(400).json({ message: "Invalid worker ID" });
    }

    // 2. If requester is WORKER, restrict to own ratings
    if (req.user.role === "WORKER" && req.user.userId !== workerId) {
      return res.status(403).json({
        message: "Access denied to other workers' ratings"
      });
    }

    // 3. Fetch ratings
    const ratings = await Rating.find({ workerId })
      .populate("customerId", "name")
      .populate("workerId", "name serviceType");

    res.json(ratings);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getRatingById = async (req, res) => {
  try {
    const rating = await Rating.findById(req.params.id);
    if (!rating) return res.status(404).json({ message: "Rating not found" });
    res.json(rating);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//
exports.updateRating = async (req, res) => {
  try {
    const { rating, review } = req.body;

    const updated = await Rating.findByIdAndUpdate(
      req.params.id,
      { rating, review },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Rating not found" });
    }

    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.deleteRating = async (req, res) => {
  try {
    const rating = await Rating.findByIdAndDelete(req.params.id);
    if (!rating) return res.status(404).json({ message: "Rating not found" });
    res.json({ message: "Rating deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};