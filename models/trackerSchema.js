const mongoose = require("mongoose");

const trackerSchema = mongoose.Schema(
  {
    source: String,
    campaign: String,
    hits: Number,
    uniqueHits: [],
    optins: [],
    details: [],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Tracker", trackerSchema);
