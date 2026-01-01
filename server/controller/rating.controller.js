const Rating = require('../models/RatingAndReview.models.js');

exports.createRating = async (req, res) => {
  try {
    const rating = new Rating(req.body);
    await rating.save();
    res.status(201).json(rating);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.craeteRatingForWorker = async (req, res) => {
  try {
    const { workerId } = req.params;
    const ratingData = req.body;
    ratingData.workerId = workerId;
    const rating = new Rating(ratingData);
    await rating.save();
    res.status(201).json(rating);
  }
    catch (error) {
    res.status(400).json({ message: error.message });
    }
};



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
    const workerId = req.params.workerId;
    if (!workerId) return res.status(400).json({ message: 'Worker ID missing' });
    const ratings = await Rating.find({ workerId });
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

exports.updateRating = async (req, res) => {
  try {
    const rating = await Rating.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!rating) return res.status(404).json({ message: "Rating not found" });
    res.json(rating);
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