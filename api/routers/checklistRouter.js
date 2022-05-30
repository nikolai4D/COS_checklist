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


router.get("/getAllDetailedData", async (req, res) => {
  console.log("Get all checklists route used");

  // get all checklists

  const responseAllChecklists = apiCallGet(`/instance?parentId=${process.env.CHECKLIST_PARENT_ID}`)
  const responseAllAddresses = apiCallGet(`/instance?parentId=${process.env.ADDRESS_PARENT_ID}`)
  const responseAllAreas = apiCallGet(`/instance?parentId=${process.env.AREA_PARENT_ID}`)
  const responseAllProperties = apiCallGet(`/instance?parentId=${process.env.PROPERTY_PARENT_ID}`)

  const responseChecklistAddressRel = apiCallGet(`/instanceDataExternalRel?parentId=${process.env.CHECKLIST_TO_ADDRESS_REL_PARENT_ID}`)
  const responseAddressPropertyRel = apiCallGet(`/instanceDataInternalRel?parentId=${process.env.ADDRESS_TO_PROPERTY_REL_PARENT_ID}`)
  const responsePropertyAreaRel = apiCallGet(`/instanceDataInternalRel?parentId=${process.env.PROPERTY_TO_AREA_REL_PARENT_ID}`)

  const results = await Promise.all([responseAllChecklists, responseAllAddresses, responseAllAreas, responseAllProperties, responseChecklistAddressRel, responseAddressPropertyRel, responsePropertyAreaRel])

  const [checklists, addresses, areas, properties, checklistAddressRel, addressPropertyRel, propertyAreaRel] = results.map(el =>{
    return el.data
  })

  const allChecklistsFormatted = []
  for(const i in checklists) {

    const el = checklists[i]


    const checklist = {}
    allChecklistsFormatted.push(checklist)

    checklist.id = el.id
    checklist.createdDate = el.created
    checklist.updatedDate = el.updated
    checklist.answers = []
    checklist.questionsWithAnwers = []	
  
    let sourcesToTarget = (await apiCallPost({"targetId": checklist.id}, `/instance/sourcesToTarget`)).data;
    for (const relation of sourcesToTarget.links){
      // console.log(relation.linkParentId, "linkParentId")
      if (relation.linkParentId === process.env.YES_TO_CHECKLIST_REL_PARENT_ID ||
      relation.linkParentId === process.env.NO_TO_CHECKLIST_REL_PARENT_ID ||
      relation.linkParentId === process.env.NA_TO_CHECKLIST_REL_PARENT_ID){
      if (relation.sources.length > 0) checklist.answers.push(relation.sources[0])}
    }

    switch(el.props[0][process.env.ASSESSMENT_STATUS]){
      case process.env.STATUS_IN_PROGRESS:
        checklist.status = "In progress"
        break
      case process.env.STATUS_NOT_APPROVED:
        checklist.status = "Not approved"
        break
      case process.env.STATUS_APPROVED:
        checklist.status = "Approved"
        break
    }


    const checklistToAddress = checklistAddressRel.find(relation => relation.source === el.id)
    if(checklistToAddress === undefined) continue
    const address = addresses.find(address => address.id === checklistToAddress.target)
    checklist.address = address


    const addressToProperty = addressPropertyRel.find(relation => relation.source === address.id)
    if(addressToProperty === undefined) continue
    const property = properties.find(property => property.id === addressToProperty.target)
    checklist.property = property


    const propertyToArea = propertyAreaRel.find(relation => relation.source === property.id)
    if(propertyToArea === undefined) continue
    checklist.area = areas.find(area => area.id === propertyToArea.target)

  }

  // get questions and answers 


  const responseQuestionsType = (await apiCallGet(`/type?parentId=${process.env.QUESTION_PARENT_ID}`)).data

  let questionsDetailed = []
  for (const type of responseQuestionsType){
    // get all questions on type level
    const question = {}
    questionsDetailed.push(question)

    question.id = type.id;
  
    // get all questions on instance level
    question.instances = (await apiCallGet(`/instance?parentId=${type.id}`)).data;
    
    // for every question, get all answers via sources to target
    for (let instance of question.instances){
      instance.answer = []
      let sourcesToTarget = (await apiCallPost({"targetId": instance.id}, `/instance/sourcesToTarget`)).data;
      // for each link, get the sources
      for (const relation of sourcesToTarget.links){
        instance.answer.push(...relation.sources)

        // for (const list of allChecklistsFormatted){
        //   for (const answer of list.answers){
        //     let match = instance.answer.find(ans => ans.id === answer.id)
        //     if (match){
        //       list.questionsWithAnwers.push({question: instance, answer: match}) }
        //   }
        // }
      }
    }
  }
  for (const checklist of allChecklistsFormatted){
    if (checklist.answers.length === 0) continue
    for (const group of questionsDetailed){
        for (const question of group.instances) {
          // console.log(question.answer, "question!!!!!!!!!")
          // console.log(checklist.answers, "checklist.answers!!!!!!!!!")
        for (const questionAnswer of question.answer){
          let inst = checklist.answers.find(ans => questionAnswer.id === ans.id)
        if (inst) checklist.questionsWithAnwers.push({question: question, answer: inst})

        }
        // let inst = question.answer.find(ans => checklist.answers.find)
        // if (inst) checklist.questionsWithAnwers.push({question: question, answer: inst})
      // }

        // for (const answer of checklist.answers){
        //   if (question.id === answer.id){
        //     checklist.questionsWithAnwers.push({question: question, answer: answer})
        //     questionsDetailed[group].instances.push(question)
        //   }
        // }
      }
    }}
  // }


  return res.json({allChecklistsFormatted, addresses, areas, properties, checklistAddressRel, addressPropertyRel, propertyAreaRel, questionsDetailed})

  // if (( (await responseAllChecklists.status) !== 200) || ((await responseAllAddresses.status ) !== 200) || ((await responseAllAreas.status)  !== 200) ||(( await responseAllProperties.status) !== 200) || ((await responseChecklistAddressRel.status) !== 200) || ((await responseAddressPropertyRel.status) !== 200) || ((await responsePropertyAreaRel.status) !== 200)) {
  //   return res.status(404).json({"message": "Something went wrong"});
  // } else {
  //   return res.json({data: allChecklistsFormatted});
  // }

});

router.post("/", async (req, res) => {
  console.log("create checklist route used");

  // Create checklist

  const reqBody = {
    title: "Safety Checklist Instance",
    props: [{[process.env.ASSESSMENT_STATUS]: process.env.STATUS_IN_PROGRESS}],
    parentId: process.env.CHECKLIST_PARENT_ID
  };

  let response = await apiCallPost(reqBody, "/instance/create");

  if ((await response.status) !== 200) {
    return res.status(response.status).json(response.data);
  }
  else {
        return res.json(response.data);
  }
});

router.delete("/", async (req, res) => {
  console.log("Delete checklist route used");
  const id = req.body.id;

  const checkListDetail = await apiCallPost({ targetId: id }, `/instance/sourcesToTarget`)

  if(checkListDetail?.data.hasOwnProperty("links")) {
    let checkListDetailId = checkListDetail.data.links[0].sources[0].id;

    //Delete related details
    console.log("mycheckListDetailId: " + checkListDetailId)

    let sourcesToCheckListDetails = (await apiCallPost({targetId: checkListDetailId}, `/instance/sourcesToTarget`)).data.links;

    for (const linkType of sourcesToCheckListDetails) {
      for (const link of linkType.sources) {
        await apiCallDelete(`/instanceData/${link.id}`);
      }
    }

    await apiCallDelete(`/instanceData/${checkListDetailId}`)
  }

  //Delete checklist
  let response = await apiCallDelete(`/instanceData/${id}`);

  if ((response.status) !== 200) {
    return res.status(response.status).json(response.data);
  } else {
    return res.json(response.data);
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

  let responseDatum = await apiCallPost(reqBody, "/instance/create");

  if ((await responseDatum.status) !== 200) {
    return res.status(responseDatum.status).json(responseDatum.data);
  } else {
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


  let sourcesToChecklist = (await apiCallPost({"targetId": req.body.checklistId}, `/instance/sourcesToTarget`)).data;

  let detailsToChecklist = await sourcesToChecklist.links.find(
    (obj) =>
      obj.linkParentId === process.env.CHECKLISTDETALJER_TO_CHECKLIST_REL_PARENT_ID
  );


  const checklistDetailsObjId = await detailsToChecklist.sources[0].id;

  let toChecklistDetailsData = (await apiCallPost({"targetId": checklistDetailsObjId}, `/instance/sourcesToTarget`)).data;
  let checklistDetailsParentId = toChecklistDetailsData.target.parentId;

  let notDatumToChecklistDetailjer = await toChecklistDetailsData.links.find(
    (obj) =>
      obj.linkParentId !== process.env.DATUM_TO_CHECKLISTDETALJER_REL_PARENT_ID
  );

  if (notDatumToChecklistDetailjer === undefined) {
    // create new omrade rel

    let reqBody = {
      source: req.body.omradeId,
      target: checklistDetailsParentId,
      props: [],
      title: "Ingår i",
      parentId: process.env.OMRADE_TO_CHECKLISTDETALJER_REL_PARENT_ID
    }

    let omradeToChecklistDetaljerTypeData = (await apiCallPost(reqBody, `/typeExternalRel/create`)).data;

    let omradeToChecklistDetaljerRelParentIdTypeData = omradeToChecklistDetaljerTypeData.id;

    // create new omrade instance with

    let omradeTypedata = (await apiCallGet(`/type?id=${req.body.omradeId}`)).data;
    reqBody = {
      title: omradeTypedata.title,
      props: [],
      parentId: omradeTypedata.id,
    };
  
    let omradeInstance = (await apiCallPost(reqBody, `/instance/create`)).data;

    // create rel between omrade and checklist detaljer instances

    reqBody = {
      source: omradeInstance.id,
      target: checklistDetailsObjId,
      props: [],
      title: "Ingår i",
      parentId: omradeToChecklistDetaljerRelParentIdTypeData
    }

    omradeToChecklistDetaljerInstance = (await apiCallPost(reqBody, `/instanceExternalRel/create`)).data;



  }



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

  let fragor = response.data.links[0].sources

  if ((await response.status) !== 200) {
    return res.status(response.status).json(response.data);
  } else {
    return res.json(fragor);
  }

});

module.exports = router;
