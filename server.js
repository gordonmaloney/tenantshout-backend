const path = require("path");
const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const port = process.env.PORT || 8000;
const cors = require("cors");

connectDB();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/campaigns", require("./routes/campaignRoutes"));

app.get("/", (req, res) => {
  res.send("API running - nice one!");
});


app.listen(port, () => console.log(`server started on port ${port}`));
