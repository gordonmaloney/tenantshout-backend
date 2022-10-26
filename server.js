const path = require("path");
const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 8000;
const cors = require("cors");

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/cards", require("./routes/cardRoutes"));

app.get("/", (req, res) => {
  res.send("API running - nice one!");
});

app.use(errorHandler);

app.listen(port, () => console.log(`server started on port ${port}`));
