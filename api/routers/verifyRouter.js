const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bodyParser = require("body-parser");
const axios = require("axios");

//Bodyparser
router.use(bodyParser.json());

//APIs

router.post("/", async (req, res) => {
  console.log("verify route used");

  await axios
    .post(process.env.API_BASE_URL + "/verify", req.body, {
      withCredentials: true,
      authorization: req.headers.authorization,
    })
    .then((response) => {
      res.status(response.status);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
