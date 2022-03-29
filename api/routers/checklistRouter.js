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

});

router.post("/create/omrade", async (req, res) => {
  console.log("create checklist omrade route used", req.body);

  //Om datum för aktuell checklist redan finns -> ta bort och skapa ny

  // vi har omradeId och checklistId. Vi vill kolla ifall det finns ett område kopplat till checklistan. 

  // Det gör vi genom att först kolla sourceToTarget till checklistId,

  let sourcesToChecklist = (await apiCallPost(req.body.omradeId, `/instance/sourcesToTarget`)).data;
  console.log(sourcesToChecklist);

  let detailsToChecklist = await sourcesToChecklist.links.find(
    (obj) =>
      obj.linkParentId ===
      "tder_6c0d45e5-ce61-42fe-9697-d4197b794f04-td_c795835c-6c3b-4292-8d06-55d71416d44b-td_1db022c1-a269-4290-832d-be29416455a0"
  );


  // som vi gör en source to target till där vill vi kolla linken där linkParentId 0´tder_6c0d45e5-ce61-42fe-9697-d4197b794f04-td_c795835c-6c3b-4292-8d06-55d71416d44b-td_1db022c1-a269-4290-832d-be29416455a0
  // Sen sourceToTarget till den länken för att få ut alla sources

  // Kolla deras parentId, ifall de är
  let omradeConfigObjId = 'co_9cd75cad-ea85-4237-a663-bc8fcfbceff8';

  let detailsNode = detailsToChecklist.sources[0]

  // to see sources to detailsNodeInstance

  let detailsNodeInstanceSources = (
    await apiCallPost(detailsNode.id,
      `/type/sourcesToTarget`
    )
  ).data.links;


  // for detailsnodeInstance, check sourcesToTarget, for all sources, get parentID, 
  // with that parentID, get more details with a simple get request, and see if that parentId == 'co_9cd75cad-ea85-4237-a663-bc8fcfbceff8'


  // let sourcesToDetails = (await apiCallPost(detailsNode.id, `/instance/sourcesToTarget`)).data;

  // let omradeTypeNode = sourcesToDetails.links.find(obj => {

  //   let sourcesToDetailType = (await apiCallGet(obj.parentId, `/instance/sourcesToTarget`)).data;

  //   obj.sources.parentId === omradeConfigObjId
  // })

  // ta reda pa istansnoden genom att kolla instance?parentId=omradeTypeNode.id


  // om ja -> ta bort länken mellan detalj och områdesnoden i typnivå
  // ta bort genom att 

  // Sen vill vi skapa en relation mellan områdesnoden i typnivå till detalj till checklistan. Därefter vill vi skapa en instans (? behöver egentligen inte.)
  // det gör vi genom att vi har id till checklistan, koppla till parentId till checklistan, vilken är td_1db022c1-a269-4290-832d-be29416455a0.
  // Därefter skapa en instans från områdesnoden med samma titel som i typnivån, till checklistan på underliggande nivå

  // let getNodeDetails = (
  //   await apiCallGet(
  //     `/type?id=${req.body.omrade}`
  //   )
  // ).data;

  // if (getNodeDetails.parentId === omradeConfigObjId) {

  // }

  // let detailsToChecklist = await sourcesToChecklist.links.find(
  //   (obj) =>
  //     obj.linkParentId ===
  //     "tder_6c0d45e5-ce61-42fe-9697-d4197b794f04-td_c795835c-6c3b-4292-8d06-55d71416d44b-td_1db022c1-a269-4290-832d-be29416455a0"
  // );

  // const detailsObjId = await detailsToChecklist.sources[0].id;

  // let sourcesToDetail = (
  //   await apiCallPost(
  //     { targetId: detailsObjId },
  //     `/instance/sourcesToTarget`
  //   )
  // ).data;

  // let sourcesToDetailsLinks = await sourcesToDetail.links;

  // if (sourcesToDetailsLinks.length > 0) {
  //   let datesToChecklist = await sourcesToDetailsLinks.find(async obj => {
  //     await obj.linkParentId === "tder_2e64c052-f211-46b2-9d21-0be86f5330eb-td_1d84a7d7-bbd9-43d3-b9d4-86d3c240383f-td_c795835c-6c3b-4292-8d06-55d71416d44b"
  //   })

  //   console.log(datesToChecklist, sourcesToDetail, 'datesToChecklist, sourceToDetail', datesToChecklist.sources[0])
  //   if (datesToChecklist) {
  //     await apiCallDelete(`/instance/${datesToChecklist.sources[0].id}`);
  //   }
  // }


  // //Skapa nytt datum för akutell checklista

  // let parentId = "td_1d84a7d7-bbd9-43d3-b9d4-86d3c240383f"

  // const reqBody = {
  //   title: req.body.datum,
  //   props: [],
  //   parentId,
  // };
  // console.log(reqBody);

  // let responseDatum = await apiCallPost(reqBody, "/instance/create");

  // console.log(responseDatum.data)

  // if ((await responseDatum.status) !== 200) {
  //   return res.status(responseDatum.status).json(responseDatum.data);
  // } else {
  //   console.log(responseDatum.data);
  //   // return res.json(response.data);
  // }


  // const responseDatumId = await responseDatum.data.id;

  // // // Create rel between I41 - I31

  // const reqBodyRel = {
  //   title: "Ingår i",
  //   props: [],
  //   source: responseDatumId,
  //   target: detailsObjId,
  //   parentId:
  //     "tder_2e64c052-f211-46b2-9d21-0be86f5330eb-td_1d84a7d7-bbd9-43d3-b9d4-86d3c240383f-td_c795835c-6c3b-4292-8d06-55d71416d44b",
  // };

  // let responseRel = await apiCallPost(
  //   reqBodyRel,
  //   "/instanceDataExternalRel/create"
  // );

  // if ((await responseRel.status) !== 200) {
  //   return res.status(responseRel.status).json(responseRel.data);
  // } else {
  //   return res.json(responseRel.data);
  // }

});

router.get("/read/omrade", async (req, res) => {
  console.log("Get all omrade route used");

  const parentId = "co_9cd75cad-ea85-4237-a663-bc8fcfbceff8";

  let response = await apiCallGet(`/type?parentId=${parentId}`);

  console.log(response);

  if ((await response.status) !== 200) {
    return res.status(response.status).json(response.data);
  } else {
    return res.json(response.data);
  }

});


router.get("/read/fragetyper", async (req, res) => {
  console.log("Get all fragetyper route used");

  const parentId = "co_f01b1750-75eb-49d8-ba64-7fc11f26e5cd";

  let response = await apiCallGet(`/type?parentId=${parentId}`);

  console.log(response);

  if ((await response.status) !== 200) {
    return res.status(response.status).json(response.data);
  } else {
    return res.json(response.data);
  }

});

router.post("/read/fragor", async (req, res) => {
  console.log("Get all fragor route used");

  // const parentId = "co_240caf9c-e9ca-404f-a9c2-8e85d4a71064";
  let targetId = req.body.targetId
  let response = await apiCallPost({ targetId }, `/type/sourcesToTarget`);

  console.log(response);

  let fragor = response.data.links[0].sources

  if ((await response.status) !== 200) {
    return res.status(response.status).json(response.data);
  } else {
    return res.json(fragor);
  }

});

router.get("/getAll", async (req, res) => {
  console.log("Get all checklists route used");

  const parentId = "td_1db022c1-a269-4290-832d-be29416455a0";

  let response = await apiCallGet(`/instance?parentId=${parentId}`);

  // console.log(response);  

  if ((await response.status) !== 200) {
    return res.status(response.status).json(response.data);
  } else {
    return res.json(response.data);
  }
});

router.get("/dashboard", async (req, res) => {
  console.log("Get all checklists route used");

  const parentId = "td_1db022c1-a269-4290-832d-be29416455a0";

  let response = await apiCallGet(`/instance?parentId=${parentId}`);


  if ((await response.status) !== 200) {
    return res.status(response.status).json(response.data);
  } else {

    let checklistWithDetails = response.data.map(async obj => {

      let sourcesToChecklist = (await apiCallPost({ targetId: obj.id }, `/instance/sourcesToTarget`)).data;


      let checklistDetailsNode;
      for (let linkObject of sourcesToChecklist.links) {
        if (linkObject.linkParentId === 'tder_6c0d45e5-ce61-42fe-9697-d4197b794f04-td_c795835c-6c3b-4292-8d06-55d71416d44b-td_1db022c1-a269-4290-832d-be29416455a0') {
          checklistDetailsNode = linkObject.sources[0];
        }
      }

      let sourcesToDetail = (
        await apiCallPost(
          { targetId: checklistDetailsNode.id },
          `/instance/sourcesToTarget`
        )
      ).data;

      let datum, omrade, fastighet, adress;
      let datumParentId = `tder_2e64c052-f211-46b2-9d21-0be86f5330eb-td_1d84a7d7-bbd9-43d3-b9d4-86d3c240383f-td_c795835c-6c3b-4292-8d06-55d71416d44b`
      let omradeParentId;
      let fastighetParentId;
      sourcesToDetail.links.forEach((detail) => {
        if (detail.linkParentId === datumParentId) {
          datum = detail.sources[0]
        }
      })
      obj.datum = datum;
      return obj
    })
    let resolvedChecklistWithDetails = await Promise.all(checklistWithDetails)
    console.log(resolvedChecklistWithDetails, 'checklistWithDetails')

    return await res.status(response.status).json(resolvedChecklistWithDetails);
  }
});

module.exports = router;
