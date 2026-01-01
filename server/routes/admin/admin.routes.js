const express = require("express");
const { verifyWorker } = require("../../controller/admin/admin.controller");
const auth = require("../../middleware/auth.middleware");
const roleGuard = require("../../middleware/role.middleware");

const router = express.Router();

router.patch(
  "/verify-worker/:workerId",
  auth,
  roleGuard("ADMIN"),
  verifyWorker
);

module.exports = router;