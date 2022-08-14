const express = require("express");
const router = express.Router();
require("dotenv").config();
const bodyParser = require("body-parser");
const axios = require("axios");
const { apiCallPost, apiCallPut, apiCallGet, apiCallDelete } = require("./helpers");
const helper = require("./utils/checklist/helpers.js");
const api = require("./utils/answer/apiCalls.js");

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

  const [checklists, addresses, areas, properties, checklistAddressRel, addressPropertyRel, propertyAreaRel] = results.map(el => {
    return el.data
  })



  const allChecklistsFormatted = []
  for (const i in checklists) {

    const el = checklists[i]


    const checklist = {}
    allChecklistsFormatted.push(checklist)

    checklist.id = el.id
    checklist.created = el.created
    checklist.updated = el.updated
    checklist.answers = []
    checklist.comments = []
    checklist.images = []

    checklist.questionsWithAnswers = []
    checklist.questionsWithComments = []
    checklist.questionsWithImages = []


    let sourcesToTarget = (await apiCallPost({ "targetId": checklist.id }, `/instance/sourcesToTarget`)).data;
    for (const relation of sourcesToTarget.links) {
      if (relation.linkParentId === process.env.YES_TO_CHECKLIST_REL_PARENT_ID ||
        relation.linkParentId === process.env.NO_TO_CHECKLIST_REL_PARENT_ID ||
        relation.linkParentId === process.env.NA_TO_CHECKLIST_REL_PARENT_ID) checklist.answers.push(...relation.sources)
      if (relation.sources[0].parentId === process.env.COMMENT_PARENT_ID) checklist.comments.push(...relation.sources)
      if (relation.sources[0].parentId === process.env.PICTURE_PARENT_ID) checklist.images.push(...relation.sources)

    }

    switch (el.props[0][process.env.ASSESSMENT_STATUS]) {
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
    if (checklistToAddress === undefined) continue
    const address = addresses.find(address => address.id === checklistToAddress.target)
    checklist.address = address


    const addressToProperty = addressPropertyRel.find(relation => relation.source === address.id)
    if (addressToProperty === undefined) continue
    const property = properties.find(property => property.id === addressToProperty.target)
    checklist.property = property


    const propertyToArea = propertyAreaRel.find(relation => relation.source === property.id)
    if (propertyToArea === undefined) continue
    checklist.area = areas.find(area => area.id === propertyToArea.target)

  }

  // get questions and answers 

  const responseQuestionsType = (await apiCallGet(`/type?parentId=${process.env.QUESTION_PARENT_ID}`)).data

  let questionsDetailed = []
  for (const type of responseQuestionsType) {
    // get all questions on type level
    const question = {}
    questionsDetailed.push(question)

    question.id = type.id;

    // get all questions on instance level
    question.instances = (await apiCallGet(`/instance?parentId=${type.id}`)).data;

    if (question.instances.length === 0) {
      let reqBody = {
        title: type.title,
        parentId: type.id,
        props: []
      };
      let questionInstance = (await api.createInstance(reqBody)).data;
      console.log(questionInstance, "QUESTION ISNTANCE")
      question.instances = [questionInstance]
    }



    // for every question, get all answers via sources to target
    for (let instance of question.instances) {
      instance.answer = []
      instance.comment = []
      instance.image = []
      let sourcesToTarget = (await apiCallPost({ "targetId": instance.id }, `/instance/sourcesToTarget`)).data;
      // for each link, get the sources
      for (const relation of sourcesToTarget.links) {
        if (relation.sources[0].parentId === process.env.COMMENT_PARENT_ID) {
          instance.comment.push(...relation.sources);
        }
        else if (relation.sources[0].parentId === process.env.PICTURE_PARENT_ID) {
          instance.image.push(...relation.sources);
        }
        else {
          instance.answer.push(...relation.sources)
        }
      }
    }
  }

  for (const checklist of allChecklistsFormatted) {

    if (checklist.answers.length === 0 && checklist.comments.length === 0 && checklist.images.length === 0) continue
    for (const group of questionsDetailed) {
      for (const question of group.instances) {

        for (const questionAnswer of question.answer) {
          let matchedAnswer = checklist.answers.find(ans => questionAnswer.id === ans.id)
          if (matchedAnswer) checklist.questionsWithAnswers.push({ question: question, answer: matchedAnswer })
        }

        for (const questionComment of question.comment) {
          let matchedComment = checklist.comments.find(ans => questionComment.id === ans.id)
          if (matchedComment) checklist.questionsWithComments.push({ question: question, comment: matchedComment })
        }

        for (const questionPicture of question.image) {
          let matchedPicture = checklist.images.find(ans => questionPicture.id === ans.id)
          if (matchedPicture) checklist.questionsWithImages.push({ question: question, image: matchedPicture })
        }
      }
    }
  }
  // }

  // console.log(JSON.stringify(allChecklistsFormatted, null, 2), "checklist")

  return res.json({ allChecklistsFormatted, addresses, areas, properties, checklistAddressRel, addressPropertyRel, propertyAreaRel, questionsDetailed })

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
    props: [{ [process.env.ASSESSMENT_STATUS]: process.env.STATUS_IN_PROGRESS }],
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

router.put("/", async (req, res) => {
  console.log("update checklist route used");

  // Create checklist
  let propVal = req.body.isApproved ? process.env.STATUS_APPROVED : process.env.STATUS_NOT_APPROVED;

  const reqBody = {
    title: "Safety Checklist Instance",
    props: [{ [process.env.ASSESSMENT_STATUS]: propVal }],
    parentId: process.env.CHECKLIST_PARENT_ID,
    id: req.body.activeChecklist.id
  };

  let response = await apiCallPut(reqBody, "/instance/update");

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

  //console.log("id: " + id)

  //Get related questions and answers relationships
  let sourcesToChecklist = (await apiCallPost({ "targetId": id }, `/instance/sourcesToTarget`)).data;

  // delete related questions relationships

  let answers = sourcesToChecklist.links.filter(el =>
    el.linkParentId === process.env.YES_TO_CHECKLIST_REL_PARENT_ID ||
    el.linkParentId === process.env.NO_TO_CHECKLIST_REL_PARENT_ID ||
    el.linkParentId === process.env.NA_TO_CHECKLIST_REL_PARENT_ID || el.sources[0].parentId === process.env.COMMENT_PARENT_ID || el.sources[0].parentId === process.env.PICTURE_PARENT_ID)

  let answersId = []

  for (let i in answers) {

    answers[i].sources.forEach(el => {
      answersId.push(el.id)
    })
  }



  // Get all related images and delete them

  //console.log("answers.id: " + answersId[0])

  for (let i = 0; i < answersId.length; i++) { //for(let of) was giving undefined results, don t know why
    const id = answersId[i]
    const sourcesToAnswer = (await apiCallPost({ "targetId": id }, `/instance/sourcesToTarget`)).data.links

    const sourcesId = []
    for (i of sourcesToAnswer) {

      i.sources.forEach(el => {
        sourcesId.push(el.id)
      })
    }

    //console.log("sourcesId: " + JSON.stringify(sourcesId, null, 2))

    // Delete comments and image related to this answer
    for (i of sourcesId) { await apiCallDelete(`/instanceData/${i}`) }

    // Delete answer
    await apiCallDelete(`/instanceData/${id}`)
  }

  const AllQuestionsToChecklistTypes = (await apiCallGet(`/typeInternalRel?parentId=${process.env.QUESTION_TO_CHECKLIST_REL_PARENT_ID}`)).data

  console.log("questionTypes: " + JSON.stringify(AllQuestionsToChecklistTypes, null, 2))
  //console.log("sourcestoCheck: " + JSON.stringify(sourcesToChecklist, null, 2))

  const questionsToCheklistsRelId = []

  for (let i in AllQuestionsToChecklistTypes) {
    const type = AllQuestionsToChecklistTypes[i]

    console.log("type: " + JSON.stringify(type, null, 2))
    const responseQuestionsLinks = (await apiCallGet(`/instanceDataInternalRel?parentId=${type.id}`)).data
    console.log("questionLinks: " + JSON.stringify(responseQuestionsLinks, null, 2))
    responseQuestionsLinks.forEach(rel => {
      if (rel.target === id) questionsToCheklistsRelId.push(rel.id)
    })
  }

  console.log("questions: " + JSON.stringify(questionsToCheklistsRelId, null, 2))

  const questionsPromises = []

  questionsToCheklistsRelId.forEach(relId => {
    questionsPromises.push(apiCallDelete(`/instanceDataInternalRel/${relId}`))
  })

  await Promise.all(questionsPromises)


  const checklistAddressRels = (await apiCallGet(`/instanceDataExternalRel?parentId=${process.env.CHECKLIST_TO_ADDRESS_REL_PARENT_ID}`)).data
  const checklistAddressRel = checklistAddressRels?.find(rel => rel.source === id)
  if (checklistAddressRel !== undefined) await apiCallDelete(`/instanceDataExternalRel/${checklistAddressRel.id}`)

  //Delete checklist
  let response = await apiCallDelete(`/instanceData/${id}`);
  if ((response.status) !== 200) {
    return res.status(response.status).json(response.data);
  } else {
    return res.json(response.data);
  }
});



module.exports = router;
