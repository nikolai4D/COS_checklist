const express = require("express");
const router = express.Router();
require("dotenv").config();
const bodyParser = require("body-parser");
const axios = require("axios");

//Bodyparser
router.use(bodyParser.json());

//APIs

router.post("/", async (req, res) => {
  console.log("auth route used1");
  await axios
    .post(process.env.API_BASE_URL + "/auth", req.body, {
      withCredentials: true,
    })
    .then((response) => {
      //Parse the cookie header
      const refreshToken = response.headers["set-cookie"]
        .toString()
        .split("; ")[0]
        .split("=")[1];

      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 86400,
      });
      res.json(response.data);
    })
    .catch((err) => {
      console.log(err.response);
    });
});

module.exports = router;
