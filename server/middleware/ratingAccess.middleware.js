const mongoose = require('mongoose');
const Rating = require('../models/RatingAndReview.models');

module.exports = async (req, res, next) => {
  try {
    const ratingId = req.params.id;

    if (!ratingId) {
      return res.status(400).json({ message: "Rating ID missing" });
    }

    if (!mongoose.Types.ObjectId.isValid(ratingId)) {
      return res.status(400).json({ message: "Invalid rating ID" });
    }

    const rating = await Rating.findById(ratingId);
    if (!rating) {
      return res.status(404).json({ message: "Rating not found" });
    }

    const { userId, role } = req.user;

    // 1️⃣ Admin → full access
    if (role === "ADMIN") {
      return next();
    }

    // 2️⃣ User → only their own ratings
    if (role === "USER" && rating.customerId.toString() === userId) {
      return next();
    }

    // 3️⃣ Worker → only ratings about them (if workerId exists)
    if (
      role === "WORKER" &&
      rating.workerId &&
      rating.workerId.toString() === userId
    ) {
      return next();
    }

    return res.status(403).json({ message: "Access denied for this rating" });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
