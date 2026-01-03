const Customer = require("../models/Customer.models");
// Update User Profile

exports.updateUserProfile = async (req, res) => {
  try {
    // 🔐 Role safety
    if (req.user.role !== "USER") {
      return res.status(403).json({ message: "Access denied" });
    }

    const userId = req.user.id;

    // ✅ Allow ONLY these fields
    const allowedFields = ["name", "phone", "location"];
    const updates = {};

    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    // ❌ No updates provided
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No valid fields to update" });
    }

    const user = await Customer.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "User profile updated successfully",
      user
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
