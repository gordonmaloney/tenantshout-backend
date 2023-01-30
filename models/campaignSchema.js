const mongoose = require("mongoose");

const campaignSchema = mongoose.Schema(
  {
    name: {
      type: String,
      unique: true
    },
    channel: String,
    target: String,
    template: String,
    hashtag: String,
    talkingPoints: String,
    subject: String,
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Campaign", campaignSchema);
