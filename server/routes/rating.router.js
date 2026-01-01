const {createRating,getRatings,getRatingById,updateRating,deleteRating,craeteRatingForWorker,getRatingsForWorker}= require('../controller/rating.controller.js');

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware.js');
const roleGuard = require('../middleware/role.middleware.js');
const ratingAccess = require('../middleware/ratingAccess.middleware.js');
// -----------------------------
// Website Ratings
// Routes related to general/site feedback and admin listing
// -----------------------------
// Create a new rating
router.post(
  '/',
  auth,
  roleGuard('USER'),
  createRating
);

// Get all ratings
router.get(
  '/',
  auth,
  roleGuard('ADMIN'),
  getRatings
);

// -----------------------------
// Worker Ratings
// Routes related to ratings tied to a specific worker
// -----------------------------
// Create rating for a worker
router.post(
  '/worker/:workerId',
  auth,
  roleGuard('USER'),
  craeteRatingForWorker
);

// Get ratings for a specific worker (visible to authenticated users/workers)
router.get(
  '/worker/:workerId',
  auth,
  getRatingsForWorker
);

// Get a rating by ID
router.get(
  '/:id',
  auth,
  ratingAccess,
  getRatingById
);

// Update a rating by ID
router.put(
  '/:id',
  auth,
  roleGuard('USER'),
  ratingAccess,
  updateRating
);

// Delete a rating by ID
router.delete(
  '/:id',   
  auth,
  roleGuard('ADMIN'),
  ratingAccess,
  deleteRating
);
module.exports = router;
