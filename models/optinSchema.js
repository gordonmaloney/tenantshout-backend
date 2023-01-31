const mongoose = require("mongoose");

const optinSchema = mongoose.Schema(
  {
    email: String,
    msg: String,
    source: String,
    postcode: String
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Optin", optinSchema);
