const express = require("express");
const router = express.Router();
require("dotenv").config();
const bodyParser = require("body-parser");
const axios = require("axios");
const { apiCallPost, apiCallGet, apiCallDelete } = require("./helpers");

//Bodyparser
router.use(bodyParser.json());

//APIs

router.post("/create", async (req, res) => {
  console.log("create checklist route used");

  // Create checklist

  const reqBodyI31 = {
    title: "I31_Rondering Trygga hus",
    props: [],
    parentId: "td_1db022c1-a269-4290-832d-be29416455a0",
  };

  let responseI31 = await apiCallPost(reqBodyI31, "/instance/create");

  if ((await responseI31.status) !== 200) {
    return res.status(responseI31.status).json(responseI31.data);
  }

  const responseI31Id = await responseI31.data.id;

  // Create instance I41

  const reqBodyI41 = {
    title: "I41_Rondering Trygga hus detaljer",
    props: [],
    parentId: "td_c795835c-6c3b-4292-8d06-55d71416d44b",
  };

  let responseI41 = await apiCallPost(reqBodyI41, "/instance/create");

  if ((await responseI41.status) !== 200) {
    return res.status(responseI41.status).json(responseI41.data);
  }

  const responseI41Id = await responseI41.data.id;

  // Create rel between I41 - I31

  const reqBodyRel = {
    title: "Ingår i",
    props: [],
    source: responseI41Id,
    target: responseI31Id,
    parentId:
      "tder_6c0d45e5-ce61-42fe-9697-d4197b794f04-td_c795835c-6c3b-4292-8d06-55d71416d44b-td_1db022c1-a269-4290-832d-be29416455a0",
  };

  let responseRel = await apiCallPost(
    reqBodyRel,
    "/instanceDataExternalRel/create"
  );

  if ((await responseRel.status) !== 200) {
    return res.status(responseRel.status).json(responseRel.data);
  } else {
    return res.json(responseI31.data);
  }
});

router.post("/create/datum", async (req, res) => {
  console.log("create checklist datum route used", req.body);

  //Om datum för aktuell checklist redan finns -> ta bort och skapa ny


  let sourcesToChecklist = (
    await apiCallPost(
      { targetId: req.body.checklistId },
      `/instance/sourcesToTarget`
    )
  ).data;


  let detailsToChecklist = await sourcesToChecklist.links.find(
    (obj) =>
      obj.linkParentId ===
      "tder_6c0d45e5-ce61-42fe-9697-d4197b794f04-td_c795835c-6c3b-4292-8d06-55d71416d44b-td_1db022c1-a269-4290-832d-be29416455a0"
  )

  const detailsObjId = await detailsToChecklist.sources[0].id;

  let sourcesToDetail = (
    await apiCallPost(
      { targetId: detailsObjId },
      `/instance/sourcesToTarget`
    )
  ).data;

  let sourcesToDetailsLinks = await sourcesToDetail.links;

  if (sourcesToDetailsLinks.length > 0) {
    let datesToChecklist = await sourcesToDetailsLinks.find(async obj => {
      await obj.linkParentId === "tder_2e64c052-f211-46b2-9d21-0be86f5330eb-td_1d84a7d7-bbd9-43d3-b9d4-86d3c240383f-td_c795835c-6c3b-4292-8d06-55d71416d44b"
    })

    console.log(datesToChecklist, sourcesToDetail, 'datesToChecklist, sourceToDetail', datesToChecklist.sources[0])
    if (datesToChecklist) {
      await apiCallDelete(`/instance/${datesToChecklist.sources[0].id}`);
    }
  }


  //Skapa nytt datum för akutell checklista

  let parentId = "td_1d84a7d7-bbd9-43d3-b9d4-86d3c240383f"

  const reqBody = {
    title: req.body.datum,
    props: [],
    parentId,
  };
  console.log(reqBody);

  let responseDatum = await apiCallPost(reqBody, "/instance/create");

  console.log(responseDatum.data)

  if ((await responseDatum.status) !== 200) {
    return res.status(responseDatum.status).json(responseDatum.data);
  } else {
    console.log(responseDatum.data);
    // return res.json(response.data);
  }


  const responseDatumId = await responseDatum.data.id;

  // // Create rel between I41 - I31

  const reqBodyRel = {
    title: "Ingår i",
    props: [],
    source: responseDatumId,
    target: detailsObjId,
    parentId:
      "tder_2e64c052-f211-46b2-9d21-0be86f5330eb-td_1d84a7d7-bbd9-43d3-b9d4-86d3c240383f-td_c795835c-6c3b-4292-8d06-55d71416d44b",
  };

  let responseRel = await apiCallPost(
    reqBodyRel,
    "/instanceDataExternalRel/create"
  );

  if ((await responseRel.status) !== 200) {
    return res.status(responseRel.status).json(responseRel.data);
  } else {
    return res.json(responseRel.data);
  }

})


// //console.log(sourcesToChecklist);
// let datesToChecklistDetails = sourcesToChecklist.links.find(
//   (obj) =>
//     obj.linkParentId ===
//     "tder_6c0d45e5-ce61-42fe-9697-d4197b794f04-td_c795835c-6c3b-4292-8d06-55d71416d44b-td_1db022c1-a269-4290-832d-be29416455a0"
// ).sources;

// console.log(datesToChecklistDetails, "1");

// if (datesToChecklistDetails.length > 0) {
//   let detailsObject = datesToChecklistDetails.find(
//     (obj) =>
//       obj.linkParentId ===
//       "tder_2e64c052-f211-46b2-9d21-0be86f5330eb-td_1d84a7d7-bbd9-43d3-b9d4-86d3c240383f-td_c795835c-6c3b-4292-8d06-55d71416d44b"
//   );
//   console.log(detailsObject, "2");
// let detailsObjectId = detailsObject.sources[0].id;

// let sourcesToDetail = (
//   await apiCallPost(
//     { targetId: detailsObjectId },
//     `/instance/sourcesToTarget`
//   )
// ).data;

// console.log(sourcesToDetail.links[0]);

// if (sourcesToDetail) {
//   await apiCallGet(`/instance/delete/${dateObjectId}`);
// }
// }

//Skapa nytt datum för akutell checklista

//   const reqBody = {
//   title: req.body.datum,
//   props: [],
//   parentId,
// };

// let response = apiCallPost(reqBody, "/instance/create");

// if ((await response.status) !== 200) {
//   return res.status(response.status).json(response.data);
// } else {
//   console.log(response.data);
//   // return res.json(response.data);
// }
// });

router.get("/getAll", async (req, res) => {
  console.log("Get all checklists route used");

  const parentId = "td_1db022c1-a269-4290-832d-be29416455a0";

  let response = await apiCallGet(`/instance?parentId=${parentId}`);

  console.log(response);

  if ((await response.status) !== 200) {
    return res.status(response.status).json(response.data);
  } else {
    return res.json(response.data);
  }
});

module.exports = router;
