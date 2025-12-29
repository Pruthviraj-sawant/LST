const Booking = require("../models/Booking.models.js");
const Worker = require("../models/Worker.models.js");

exports.createBooking = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      workerId,
      workType,
      scheduledDate,
      scheduledTime,
      bookingDate,
      bookingTime,
      timeSlot
    } = req.body;

    const finalDate = scheduledDate || bookingDate;
    const finalTime = scheduledTime || bookingTime;

    // 1. Fetch worker
    const worker = await Worker.findById(workerId);
    if (!worker || !worker.isVerified) {
      return res.status(404).json({ message: "Worker not available" });
    }

    // 2. Find service price
    const service = worker.charges.services.find(
      (s) => s.workType === workType
    );

    if (!service) {
      return res.status(400).json({ message: "Service not offered by worker" });
    }

    // 3. Calculate total amount
    const visitCharge = worker.charges.visitCharge || 0;
    const serviceCharge = service.price;

    const totalAmount = visitCharge + serviceCharge;

    // 4. Create booking
    const booking = await Booking.create({
      customerId: userId,
      workerId,
      serviceType: worker.serviceType,
      bookingDate: finalDate,
      bookingTime: finalTime,
      timeSlot: timeSlot || undefined,
      amount: totalAmount,
      pricingBreakdown: {
        visitCharge,
        serviceCharge,
        workType
      },
      status: "PENDING"
    });

    res.status(201).json({ booking });

  } catch (error) {
    res.status(500).json({ message: "Booking failed" });
  }
};
