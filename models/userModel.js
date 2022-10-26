const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    streak: { type: Number, default: 0 },
    last: { type: Number, default: 0 },
    cards: [
      {
        front: String,
        back: String,
        date: Number,
        delay: Number,
        reviews: Number,
        tag: String,
        level: String,
        lastForgotten: Number
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
