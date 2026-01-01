const Rating = require('../models/RatingAndReview.models');

module.exports = async (req, res, next) => {
  try {
    const ratingId = req.params.id;
    if (!ratingId) return res.status(400).json({ message: 'Rating ID missing' });

    const rating = await Rating.findById(ratingId);
    if (!rating) return res.status(404).json({ message: 'Rating not found' });

    const user = req.user;
    if (!user) return res.status(401).json({ message: 'Unauthorized' });

    // Admins can access anything
    if (user.role === 'ADMIN' || user.role === 'admin') return next();

    // Customers can access ratings they created
    if ((user.role === 'USER' || user.role === 'user') && rating.customerId.toString() === user.id) return next();

    // Workers can access ratings for themselves
    if ((user.role === 'WORKER' || user.role === 'worker') && rating.workerId.toString() === user.id) return next();

    return res.status(403).json({ message: 'Access denied for this rating' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
