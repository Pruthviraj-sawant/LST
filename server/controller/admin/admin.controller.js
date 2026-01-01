const Worker = require("../../models/Worker.models");

exports.verifyWorker = async (req, res) => {
  try {
    const { workerId } = req.params;
    const { isVerified } = req.body;

    if (typeof isVerified !== "boolean") {
      return res.status(400).json({
        message: "isVerified must be true or false"
      });
    }

    const worker = await Worker.findByIdAndUpdate(
      workerId,
      { isVerified },
      { new: true }
    );

    if (!worker) {
      return res.status(404).json({
        message: "Worker not found"
      });
    }

    res.status(200).json({
      message: `Worker verification status updated to ${isVerified}`,
      worker
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to update worker verification"
    });
  }
};
