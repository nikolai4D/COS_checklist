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
  console.log("refresh route used");

  await axios
    .get(process.env.API_BASE_URL + "/refresh", {
      withCredentials: true,
      Cookie: req.cookie,
    })
    .then((response) => {
      res.json(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
