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
  console.log(req, res);

  try {
    const resp = await axios({
      method: "GET",
      url: process.env.API_BASE_URL + "/logout",
    });

    console.log(resp);
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
  //   return await axios
  //     .get(process.env.API_BASE_URL + "/logout")
  //     .then((response) => res.status(response.status));
});

module.exports = router;
