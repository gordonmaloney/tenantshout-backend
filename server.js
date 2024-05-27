const path = require("path");
const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const port = process.env.PORT || 8002;
const cors = require("cors");
const { MongoClient } = require('mongodb');
var bodyParser = require('body-parser')

connectDB();

const app = express();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use("/api/campaigns", require("./routes/campaignRoutes"));
app.use("/api/optin", require("./routes/optinRoutes"));
app.use("/api/tracker", require("./routes/trackerRoutes"));

app.get("/", (req, res) => {
  res.send("API running - nice one!");
});


client.connect(err => {
  if(err){ console.error(err); return false;}
  // connection to mongo is successful, listen for requests
  app.listen(port, () => {
      console.log("listening for requests. port: " + port);
  })
});