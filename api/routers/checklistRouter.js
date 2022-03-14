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

  const reqBodyI31 = {
    title: "I31_Rondering Trygga hus",
    props: [],
    parentId: "td_1db022c1-a269-4290-832d-be29416455a0",
  };

  let responseI31 = undefined;

  try {
    responseI31 = await axios.post(
      process.env.API_BASE_URL + "/instance/create",
      reqBodyI31,
      {
        withCredentials: true,
        credientials: "include",
        headers: {
          apikey: process.env.API_KEY,
        },
      }
    );

    console.log("try create I31 checklist");
  } catch (err) {
    // Handle Error Here
    responseI31 = err.response;
    console.log("catch create I31 checklist");
  }

  if ((await responseI31.status) !== 200) {
    return res.status(responseI31.status).json(responseI31.data);
  }

  const responseI31Id = await responseI31.data.id;
  //   } else {
  //     return res.json(response.data);
  //   }

  // skapa instance I41

  const reqBodyI41 = {
    title: "I41_Rondering Trygga hus detaljer",
    props: [],
    parentId: "td_c795835c-6c3b-4292-8d06-55d71416d44b",
  };

  let responseI41 = undefined;

  try {
    responseI41 = await axios.post(
      process.env.API_BASE_URL + "/instance/create",
      reqBodyI41,
      {
        withCredentials: true,
        credientials: "include",
        headers: {
          apikey: process.env.API_KEY,
        },
      }
    );

    console.log("try create I41 checklist");
  } catch (err) {
    // Handle Error Here
    responseI41 = err.response;
    console.log("catch create I41 checklist");
  }

  if ((await responseI41.status) !== 200) {
    return res.status(responseI41.status).json(responseI41.data);
  }

  const responseI41Id = await responseI41.data.id;

  // skapa rel mellan I41 och I31

  const reqBodyRel = {
    title: "Ingår i",
    props: [],
    source: responseI41Id,
    target: responseI31Id,
    parentId:
      "tder_6c0d45e5-ce61-42fe-9697-d4197b794f04-td_c795835c-6c3b-4292-8d06-55d71416d44b-td_1db022c1-a269-4290-832d-be29416455a0",
  };

  let responseRel = undefined;

  try {
    responseRel = await axios.post(
      process.env.API_BASE_URL + "/instanceDataExternalRel/create",
      reqBodyRel,
      {
        withCredentials: true,
        credientials: "include",
        headers: {
          apikey: process.env.API_KEY,
        },
      }
    );

    console.log("try instanceDataExternalRel checklist");
  } catch (err) {
    // Handle Error Here
    responseRel = err.response;
    console.log("catch instanceDataExternalRel checklist");
  }

  if ((await responseRel.status) !== 200) {
    return res.status(responseRel.status).json(responseRel.data);
  } else {
    return res.json(responseI31.data);
  }
});

router.post("/create/datum", async (req, res) => {
  console.log("create checklist datum route used", req.body);

  //Om datum för aktuell checklist redan finns -> ta bort och skapa ny

  //ckapa nytt datum för akutell checklista

  const reqBody = {
    title: req.body.datum,
    props: [],
    parentId: "td_1d84a7d7-bbd9-43d3-b9d4-86d3c240383f",
  };

  console.log(reqBody);

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
