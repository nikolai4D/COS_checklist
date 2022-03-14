const express = require("express");
const router = express.Router();
require("dotenv").config();
const bodyParser = require("body-parser");
const axios = require("axios");

//Bodyparser
router.use(bodyParser.json());

//APIs

router.post("/create", async (req, res) => {
  console.log("create checklist route used");

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

    console.log("try create checklist");
  } catch (err) {
    // Handle Error Here
    response = err.response;
    console.log("catch create checklist");
  }

  if ((await response.status) !== 200) {
    return res.status(response.status).json(response.data);
  } else {
    return res.json(response.data);
  }
});

router.post("/create/datum", async (req, res) => {
  console.log("create checklist datum route used", req.body);

  const reqBody = {
    title: req.body.datum,
    props: [],
    parentId: "td_1d84a7d7-bbd9-43d3-b9d4-86d3c240383f",
  };

  console.log(reqBody)

  let response;

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

    console.log("try create datum");
  } catch (err) {
    // Handle Error Here
    response = err.response;
    console.log("catch create datum");
  }

  if ((await response.status) !== 200) {
    return res.status(response.status).json(response.data);
  } else {
    console.log(response.data);
    // return res.json(response.data);
  }
});


router.get("/getAll", async (req, res) => {
  console.log("Get all checklists route used");

  const parentId = "td_1db022c1-a269-4290-832d-be29416455a0";

  let response = undefined;

  try {
    response = await axios.get(
      process.env.API_BASE_URL + `/instance?parentId=${parentId}`,
      {
        // withCredentials: true,
        // credientials: "include",
        headers: {
          apikey: process.env.API_KEY,
        },
      }
    );

    console.log("try Get all checklists ");
  } catch (err) {
    // Handle Error Here
    response = err.response;
    console.log("catch Get all checklists");
  }

  console.log(response);

  if ((await response.status) !== 200) {
    return res.status(response.status).json(response.data);
  } else {
    return res.json(response.data);
  }
});

module.exports = router;
