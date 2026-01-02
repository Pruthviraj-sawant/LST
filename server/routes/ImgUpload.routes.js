const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const roleGuard = require("../middleware/role.middleware");
const upload = require("../middleware/upload.middleware");

const {
  updateUserProfileImage
} = require("../controller/CustomerImgUpload.controller");

const {
  updateWorkerProfileImage
} = require("../controller/WorkerImgUpload.controller");

// USER
router.patch(
  "/user/profile-image",
  auth,
  roleGuard("USER"),
  upload.single("image"),
  updateUserProfileImage
);

// WORKER
router.patch(
  "/worker/profile-image",
  auth,
  roleGuard("WORKER"),
  upload.single("image"),
  updateWorkerProfileImage
);

module.exports = router;
