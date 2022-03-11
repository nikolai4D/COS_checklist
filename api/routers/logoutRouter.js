const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bodyParser = require("body-parser");
const axios = require("axios");

//Bodyparser
router.use(bodyParser.json());

//APIs

router.get("/", async (req, res) => {
  console.log("logout route used!!!");

  let response;

  try {
    response = await axios({
      method: "GET",
      url: process.env.API_BASE_URL + "/logout",
    });
    console.log("try logout api");
  } catch (err) {
    // Handle Error Here
    response = err.response;
    console.error("catch logout api");
  }

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  return res.status(response.status).json(response.data);
});

module.exports = router;
