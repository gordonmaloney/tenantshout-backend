const express = require("express");
const { getCampaign, getCampaigns, createCampaign } = require("../controllers/campaignController");
const router = express.Router();


router.get('/all', getCampaigns)
router.get("/:campaignName", getCampaign);
router.post("/", createCampaign);


module.exports = router;
