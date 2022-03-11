const express = require("express");
const router = express.Router();
require("dotenv").config();
const bodyParser = require("body-parser");
const axios = require("axios");

//Bodyparser
router.use(bodyParser.json());

//APIs

router.post("/", async (req, res) => {
  console.log("auth route used");

  let response = undefined;

  try {
    response = await axios.post(process.env.API_BASE_URL + "/auth", req.body, {
      withCredentials: true,
    });

    console.log("try auth api");
  } catch (err) {
    // Handle Error Here
    response = err.response;
    console.log("catch auth api");
  }

  if ((await response.status) !== 200) {
    return res.status(response.status).json(response.data);
  } else {
    res.cookie(response.headers["set-cookie"]);
    return res.json(response.data);
  }
});

module.exports = router;
