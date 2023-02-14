const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const Tracker = require("../models/trackerSchema");
const { db } = require("../models/optinSchema");
const dotenv = require("dotenv").config();


const CreateTrackerEntry = async (req, res) => {

    const { source, campaign, hits, uniqueHits, details, optins } = req.body;
    const ExistingEntry = await Tracker.findOne({source})
    console.log(ExistingEntry)
  try {

    if (!ExistingEntry) {
        //create new
        console.log('source not found - creating:')

        const trackerEntry = await Tracker.create({
          source, campaign: [campaign], hits, uniqueHits: [uniqueHits], details: [details], optins: [optins]
        });
    
        res.status(200).json("Successfully created " + trackerEntry);    
    }

    if (ExistingEntry) {
        console.log('source found - adding:')

        ExistingEntry.campaign.push(campaign)
       ExistingEntry.hits = parseInt(ExistingEntry.hits) + parseInt(hits);
       ExistingEntry.uniqueHits.push(uniqueHits)
       ExistingEntry.details.push(details)
       ExistingEntry.optins.push(optins)
        
        console.log(ExistingEntry)
        ExistingEntry.save()
        res.status(200).json("Successfully added " + ExistingEntry);    
    }
  } catch {
    res.status(500).json("uh oh!");
  }
};



const getTracking = asyncHandler(async (req, res) => {
    try {
    const {password} = req.body

    if (password == process.env.PASSWORD) {
        const track = await Tracker.find();

        res.status(200).json(track)
    }
    else {
        res.status(500).json('unauthorised')
    } } catch {
        res.status(500).json('unauthorised')
    }
})

module.exports = {
    CreateTrackerEntry,
    getTracking
};
