const Booking = require("../models/Booking.models.js");
const Worker = require("../models/Worker.models.js");

exports.createBooking = async (req, res) => {
  try {
    const customerId = req.user.id;

    const {
      workerId,
      workType,
      bookingDate,
      bookingTime,
      timeSlot
    } = req.body;

    // 1. Validate worker
    const worker = await Worker.findById(workerId);
    if (!worker || !worker.isVerified) {
      return res.status(404).json({
        message: "Worker not available"
      });
    }

    //double booking check
    const conflictBooking = await Booking.findOne({
  workerId,
  bookingDate: finalDate,
  bookingTime: finalTime,
  status: "CONFIRMED"
});

if (conflictBooking) {
  return res.status(409).json({
    message: "Worker already has a confirmed booking for this time"
  });
}

    // 2. Find service pricing
    const service = worker.charges.services.find(
      (s) => s.workType === workType
    );

    if (!service) {
      return res.status(400).json({
        message: "Service not offered by this worker"
      });
    }



    // 3. Calculate pricing
    const visitCharge = worker.charges.visitCharge || 0;
    const serviceCharge = service.price;
    const totalAmount = visitCharge + serviceCharge;

    // Platform fee (5%)
    const platformFee = Math.round(totalAmount * 0.05);
    const workerEarnings = totalAmount - platformFee;

    // 4. Create booking
    const booking = await Booking.create({
      customerId,
      workerId,
      serviceType: worker.serviceType,
      bookingDate,
      bookingTime,
      timeSlot: timeSlot || null,
      amount: totalAmount,
      pricingBreakdown: {
        visitCharge,
        serviceCharge,
        workType
      },
      platformFee,
      workerEarnings,
      status: "PENDING"
    });

    return res.status(201).json({
      success: true,
      booking
    });

  } catch (error) {
    console.error("Create Booking Error:", error);
    return res.status(500).json({
      message: "Booking failed"
    });
  }
};


/* ================================
   USER: Get My Bookings
================================ */
exports.getUserBookings = async (req, res) => {
  try {
    const customerId = req.user.id;

    const bookings = await Booking.find({ customerId })
      .populate("workerId", "name phone serviceType")
      .sort({ createdAt: -1 });

    res.status(200).json({ bookings });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user bookings" });
  }
};

/* ================================
   WORKER: Get My Bookings
================================ */
exports.getWorkerBookings = async (req, res) => {
  try {
    const workerId = req.user.id;

    const bookings = await Booking.find({ workerId })
      .populate("customerId", "name phone")
      .sort({ createdAt: -1 });

    res.status(200).json({ bookings });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch worker bookings" });
  }
};

/* ================================
   WORKER: Accept Booking
================================ */
exports.acceptBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.status !== "PENDING") {
      return res.status(400).json({
        message: "Only pending bookings can be accepted"
      });
    }

    //prevent race condition double booking
      const conflict = await Booking.findOne({
      _id: { $ne: booking._id },
      workerId: booking.workerId,
      bookingDate: booking.bookingDate,
      bookingTime: booking.bookingTime,
      status: "CONFIRMED"
    });

    if (conflict) {
      return res.status(409).json({
        message: "Time slot already booked"
      });
    }

    booking.status = "CONFIRMED";
    await booking.save();

    res.status(200).json({
      message: "Booking accepted",
      booking
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to accept booking" });
  }
};

/* ================================
   WORKER: Complete Booking
================================ */
exports.completeBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.status !== "CONFIRMED") {
      return res.status(400).json({
        message: "Only confirmed bookings can be completed"
      });
    }

    booking.status = "COMPLETED";
    await booking.save();

    res.status(200).json({
      message: "Booking completed successfully",
      booking
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to complete booking" });
  }
};

/* ================================
   USER / WORKER: Cancel Booking
================================ */
exports.cancelBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.status === "COMPLETED") {
      return res.status(400).json({
        message: "Completed bookings cannot be cancelled"
      });
    }

    booking.status = "CANCELLED";
    await booking.save();

    res.status(200).json({
      message: "Booking cancelled successfully",
      booking
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to cancel booking" });
  }
};