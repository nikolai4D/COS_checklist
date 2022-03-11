const express = require("express");
const router = express.Router();
require("dotenv").config();
const bodyParser = require("body-parser");
const axios = require("axios");
const cookieParser = require("cookie-parser");

//Bodyparser
router.use(bodyParser.json());

//APIs

router.get("/", async (req, res) => {
  console.log("refresh route used");

  let response;

  if (!req.cookies.jwt) {
    req.cookies.jwt = "missing";
  }

  try {
    response = await axios.get(process.env.API_BASE_URL + "/refresh", {
      withCredentials: true,
      credientials: "include",
      cookies: "req.cookies",
      headers: {
        cookies: req.cookies,
        cookiejwt: req.cookies.jwt,
      },
    });
    console.log("try refresh api");
  } catch (err) {
    // Handle Error Here
    response = err.response;
    console.log("catch refresh api", err);
  }

  return res.status(response.status).json(response.data);
});

module.exports = router;
