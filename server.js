require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/form", async (req, res) => {
  console.log("FORM DATA:", req.body);
  res.json({ success: true });
});

module.exports = app;
