const Customer = require('../models/Customer.models');
const cloudinary = require('../config/cloudinary');
// Update User Profile Image
exports.updateUserProfileImage = async (req, res) => {
  try {
    if (req.user.role !== "USER") {
      return res.status(403).json({ message: "Access denied" });
    }

    const userId = req.user.id;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const user = await Customer.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found in database" });
    }

    if (user.profileImage?.publicId) {
      await cloudinary.uploader.destroy(user.profileImage.publicId);
    }

    user.profileImage = {
      url: req.file.path,
      publicId: req.file.filename
    };

    await user.save();

    res.json({
      message: "Profile image updated successfully",
      profileImage: user.profileImage
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
