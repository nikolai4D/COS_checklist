const express = require("express");
const router = express.Router();
require("dotenv").config();
const bodyParser = require("body-parser");
const axios = require("axios");

//Bodyparser
router.use(bodyParser.json());

//APIs

router.post("/create", async (req, res) => {
  console.log("auth route used");

  const reqBody = {
    title: "I31_Rondering Trygga hus",
    props: [],
    parentId: "td_1db022c1-a269-4290-832d-be29416455a0",
  };

  let response = undefined;

  try {
    response = await axios.post(
      process.env.API_BASE_URL + "/instance/create",
      reqBody,
      {
        withCredentials: true,
        credientials: "include",
        headers: {
          apikey: process.env.API_KEY,
        },
      }
    );

    console.log("try auth api");
  } catch (err) {
    // Handle Error Here
    response = err.response;
    console.log("catch auth api");
  }

  if ((await response.status) !== 200) {
    return res.status(response.status).json(response.data);
  } else {
    return res.json(response.data);
  }
});

module.exports = router;
