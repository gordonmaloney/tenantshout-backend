const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const Optin = require("../models/optinSchema");
const { db } = require("../models/optinSchema");
const dotenv = require("dotenv").config();

const createOptin = async (req, res) => {

    console.log(req.body)
  try {
    const { email, msg, source, postcode } = req.body;

    const optin = await Optin.create({
      email,
      msg,
      source,
      postcode
    });

    res.status(200).json("Successfully opted in" + optin);
  } catch {
    res.status(500).json("uh oh!");
  }
};



const getOptins = asyncHandler(async (req, res) => {
    try {
    const {password} = req.body

    if (password == process.env.PASSWORD) {
        const optins = await Optin.find();

        res.status(200).json(optins)
    }
    else {
        res.status(500).json('unauthorised')
    } } catch {
        res.status(500).json('unauthorised')
    }
})

module.exports = {
  createOptin,
  getOptins
};
