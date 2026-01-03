const Worker = require('../models/Worker.models');
const cloudinary = require('../config/cloudinary');

// Update Worker Profile Image
exports.updateWorkerProfileImage = async (req, res) => {
  try {
    const workerId = req.user.id;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const worker = await Worker.findById(workerId);
     if (!worker) {
      return res.status(404).json({ message: "Worker not found" });
    }

    if (worker.profileImage.publicId) {
      await cloudinary.uploader.destroy(worker.profileImage.publicId);
    }

    worker.profileImage = {
      url: req.file.path,
      publicId: req.file.filename
    };

    await worker.save();

    res.json({
      message: "Profile image updated",
      profileImage: worker.profileImage
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
