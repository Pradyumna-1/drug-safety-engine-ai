const express =
  require("express");

const router =
  express.Router();

const {
  runSafetyCheck
} = require(
  "../controller/safetyController"
);

router.post(
  "/check",
  runSafetyCheck
);

module.exports = router;