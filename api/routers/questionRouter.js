const express = require("express");
const router = express.Router();
require("dotenv").config();
const bodyParser = require("body-parser");
const axios = require("axios");
const { apiCallPost, apiCallGet, apiCallDelete } = require("./helpers");

//Bodyparser
router.use(bodyParser.json());

//APIs

// 
router.get("/getAllData", async (req, res) => {
  console.log("Get all checklists route used");

  const parentId = process.env.CHECKLIST_PARENT_ID;

  let response = await apiCallGet(`/instance?parentId=${parentId}`);

  if ((await response.status) !== 200) {
    return res.status(response.status).json(response.data);
  } else {
    return res.json(response.data);
  }
});


module.exports = router;
