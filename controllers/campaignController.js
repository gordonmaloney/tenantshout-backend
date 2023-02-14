const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const Campaign = require("../models/campaignSchema");
const { db } = require("../models/campaignSchema");

//@desc get user cards
//@route GET /api/cards
//@access private
const getCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    res.status(200).json(campaigns);
  } catch {
    res.status(500).json("uh oh!");
  }
};

const getCampaign = async (req, res) => {

    console.log(req.params)
  try {
    const { campaignName } = req.params;

    const campaign = await Campaign.findOne({ name: campaignName });

    res.status(200).json(campaign);
  } catch {
    res.status(500).json("uh oh!");
  }
};

//@desc create new card
//@route POST /api/card
//@access private
const createCampaign = async (req, res) => {

    const {name} = req.body
  const campaign = await Campaign.findOne({ name: name });

  if (campaign) {
    res.status(500).json("Campaign name in use");
  } else {
    try {
      const { name, channel, target, template, hashtag, subject, talkingPoints } =
        req.body;

      const campaign = await Campaign.create({
        name,
        channel,
        target,
        template,
        hashtag,
        talkingPoints,
        subject
      });

      res.status(200).json(campaign);
    } catch {
      res.status(500).json("uh oh!");
    }
  }
};


const editCampaign = async (req, res) => {

  const {name} = req.body
const campaign = await Campaign.findOne({ name: name });

if (!campaign) {
  res.status(500).json("Campaign not found");
} else {
  try {
    const { name, channel, target, template, hashtag, subject, talkingPoints } =
      req.body;

      campaign.name = name,
      campaign.channel = channel,
      campaign.target = target,
      campaign.template = template,
      campaign.hashtag = hashtag,
      campaign.subject = subject,
      campaign.talkingPoints = talkingPoints

      campaign.save()

    res.status(200).json(campaign);
  } catch {
    res.status(500).json("uh oh!");
  }
}
};


module.exports = {
  getCampaigns,
  getCampaign,
  createCampaign,
  editCampaign
};
