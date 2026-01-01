const express = require("express");
const auth = require("../middleware/auth.middleware.js");
const roleGuard = require("../middleware/role.middleware.js");
const bookingAccess = require("../middleware/bookingAccess.middleware.js");

const {
  createBooking,
  getUserBookings,
  getWorkerBookings,
  acceptBooking,
  completeBooking,
  cancelBooking
} = require("../controller/booking.controller.js");

const router = express.Router();

/* USER ROUTES */
router.post(
  "/",
  auth,
  roleGuard("USER"),
  createBooking
);

router.get(
  "/user",
  auth,
  roleGuard("USER"),
  getUserBookings
);

router.patch(
  "/:id/cancel",
  auth,
  roleGuard("USER"),
  bookingAccess,
  cancelBooking
);

/* WORKER ROUTES */
router.get(
  "/worker",
  auth,
  roleGuard("WORKER"),
  getWorkerBookings
);

router.patch(
  "/:id/accept",
  auth,
  roleGuard("WORKER"),
  bookingAccess,
  acceptBooking
);

router.patch(
  "/:id/complete",
  auth,
  roleGuard("WORKER"),
  bookingAccess,
  completeBooking
);

module.exports = router;
