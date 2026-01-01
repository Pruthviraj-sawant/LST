const Admin = require("../../models/Admin.models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* ===============================
   ADMIN LOGIN
================================ */
exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin || !admin.isActive) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    const token = jwt.sign(
      {
        userId: admin._id,
        role: admin.role // "ADMIN"
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Admin login successful",
      token
    });

  } catch (error) {
    res.status(500).json({
      message: "Admin login failed"
    });
  }
};
