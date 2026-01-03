const express = require("express");
const auth = require("../middleware/auth.middleware");
const roleGuard = require("../middleware/role.middleware");

const { updateUserProfile } = require("../controller/CustomerProfile.controller");
const { updateWorkerProfile } = require("../controller/WorkerProfile.controller");

const router = express.Router();

// USER PROFILE UPDATE
router.patch(
  "/user/profile",
  auth,
  roleGuard("USER"),
  updateUserProfile
);

// WORKER PROFILE UPDATE
router.patch(
  "/worker/profile",
  auth,
  roleGuard("WORKER"),
  updateWorkerProfile
);

module.exports = router;
