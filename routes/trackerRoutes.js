const express = require("express");
const { CreateTrackerEntry, getTracking } = require("../controllers/trackerController");
const router = express.Router();


router.post('/', CreateTrackerEntry)
router.post('/all', getTracking)


module.exports = router;
