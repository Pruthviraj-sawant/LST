const Booking = require("../models/Booking.models");

module.exports = async (req, res, next) => {
  try {
    const bookingId = req.params.id;
    const userId = req.user.id;
    const role = req.user.role;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found"
      });
    }

    if (
      (role === "USER" && booking.customerId.toString() !== userId) ||
      (role === "WORKER" && booking.workerId.toString() !== userId)
    ) {
      return res.status(403).json({
        message: "You are not authorized to access this booking"
      });
    }

    req.booking = booking; // optional but useful
    next();

  } catch (error) {
    return res.status(500).json({
      message: "Booking access verification failed"
    });
  }
};
