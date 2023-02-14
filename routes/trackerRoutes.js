const express = require("express");
const {
  CreateTrackerEntry,
  getTracking,
  deleteTracking,
  CreateTrackerHit,
} = require("../controllers/trackerController");
const router = express.Router();

router.post("/", CreateTrackerEntry);
router.post("/all", getTracking);
router.post("/delete", deleteTracking);
router.post("/hit", CreateTrackerHit);

module.exports = router;
