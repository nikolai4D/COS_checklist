const express = require("express");
const router = express.Router();
require("dotenv").config();
const bodyParser = require("body-parser");
const axios = require("axios");

//Bodyparser
router.use(bodyParser.json());

//APIs

router.get("/", async (req, res) => {
  console.log("verify route used");
  let response;

  const config = {
    headers: {
      authorization: req.headers.authorization,
      withCredentials: true,
    },
  };

  console.log(req.headers.authorization, "req.headers.authorization");

  try {
    response = await axios.get(process.env.API_BASE_URL + "/verify", config);
    console.log("try verify api");
  } catch (err) {
    // Handle Error Here
    response = err.response;
    console.log("catch verify api");
  }

  return res.status(response.status).json(response.data);
});

module.exports = router;
