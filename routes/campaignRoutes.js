const express = require("express");
const { getCampaign, getCampaigns, createCampaign, editCampaign } = require("../controllers/campaignController");
const router = express.Router();


router.get('/all', getCampaigns)
router.get("/:campaignName", getCampaign);

router.post("/", createCampaign);
router.post("/:campaignName", editCampaign);


module.exports = router;
