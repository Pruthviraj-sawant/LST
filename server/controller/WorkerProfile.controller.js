const Worker = require("../models/Worker.models");



// Update Worker Profile
exports.updateWorkerProfile = async (req, res) => {
  try {
    // 🔐 Role safety
    if (req.user.role !== "WORKER") {
      return res.status(403).json({ message: "Access denied" });
    }

    const workerId = req.user.id;

    // ✅ Allowed worker-editable fields
    const allowedFields = [
      "description",
      "charges",
      "location",
      "serviceType"
    ];

    const updates = {};

    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No valid fields to update" });
    }

    const worker = await Worker.findByIdAndUpdate(
      workerId,
      { $set: updates },
      { new: true, runValidators: true }
    ).select("-password");

    if (!worker) {
      return res.status(404).json({ message: "Worker not found" });
    }

    res.json({
      message: "Worker profile updated successfully",
      worker
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
