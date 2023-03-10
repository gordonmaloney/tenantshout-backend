const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const Tracker = require("../models/trackerSchema");
const { db } = require("../models/optinSchema");
const dotenv = require("dotenv").config();
const RequestIp = require("@supercharge/request-ip");

const CreateTrackerEntry = async (req, res) => {
  const ipAddy = RequestIp.getClientIp(req);

  const { source, campaign, hits, details, optins } = req.body;
  const ExistingEntry = await Tracker.findOne({ source });

  try {
    if (!ExistingEntry) {
      //create new

      const trackerEntry = await Tracker.create({
        source,
        campaign: [campaign],
        hits,
        uniqueHits: [ipAddy]
      });

      res.status(200).json("Successfully created " + trackerEntry);
    }

    if (ExistingEntry) {
      ExistingEntry.campaign.push(campaign);
      !ExistingEntry.uniqueHits.includes(ipAddy) && ExistingEntry.uniqueHits.push(ipAddy);
      ExistingEntry.details.push(details);
      ExistingEntry.optins.push(optins);


      ExistingEntry.save();
      res.status(200).json("Successfully added " + ExistingEntry);
    }
  } catch {
    res.status(500).json("uh oh!");
  }
};

const CreateTrackerHit = async (req, res) => {
  const ipAddy = RequestIp.getClientIp(req);

  console.log(ipAddy);

  const { source, hits, uniqueHits } = req.body;
  const ExistingEntry = await Tracker.findOne({ source });
  try {
    if (!ExistingEntry) {
      //create new

      const trackerEntry = await Tracker.create({
        source,
        hits,
      });

      res.status(200).json("Successfully created " + trackerEntry);
    }

    if (ExistingEntry) {
      ExistingEntry.hits = parseInt(ExistingEntry.hits) + parseInt(hits);
      !ExistingEntry.uniqueHits.includes(ipAddy) &&
        ExistingEntry.uniqueHits.push(ipAddy);

      console.log(ExistingEntry);
      ExistingEntry.save();
      res.status(200).json("Successfully added " + ExistingEntry);
    }
  } catch {
    res.status(500).json("uh oh!");
  }
};

const deleteTracking = asyncHandler(async (req, res) => {
  try {
    const { password } = req.body;

    if (password == process.env.PASSWORD) {
      const track = await Tracker.deleteMany({});

      res.status(200).json(track);
    } else {
      res.status(500).json("unauthorised");
    }
  } catch {
    res.status(500).json("unauthorised");
  }
});

const getTracking = asyncHandler(async (req, res) => {
  try {
    const { password } = req.body;

    if (password == process.env.PASSWORD) {
      const track = await Tracker.find();

      res.status(200).json(track);
    } else {
      res.status(500).json("unauthorised");
    }
  } catch {
    res.status(500).json("unauthorised");
  }
});

module.exports = {
  CreateTrackerEntry,
  getTracking,
  deleteTracking,
  CreateTrackerHit,
};
