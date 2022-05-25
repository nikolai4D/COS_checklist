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
      
        // get all checklists
      
        const responseAllQuestionGroups = apiCallGet(`/type?parentId=${process.env.QUESTION_GROUP_PARENT_ID}`)
        const responseAllQuestions = apiCallGet(`/type?parentId=${process.env.QUESTION_PARENT_ID}`)
        const responseAllAnswers = apiCallGet(`/type?parentId=${process.env.ANSWER_PARENT_ID}`)
        const responseAllAnswerDetails = apiCallGet(`/type?parentId=${process.env.ANSWER_DETAIL_PARENT_ID}`)
      
        const responseQuestionToChecklistRel = apiCallGet(`/typeDataInternalRel?parentId=${process.env.QUESTION_TO_CHECKLIST_REL_PARENT_ID}`)
        const responseQuestionToQuestionGroupRel = apiCallGet(`/typeDataInternalRel?parentId=${process.env.QUESTION_TO_QUESTION_GROUP_REL_PARENT_ID}`)
        const responsePreferredAnswerToQuestionRel = apiCallGet(`/typeDataInternalRel?parentId=${process.env.PREFERRED_ANSWER_TO_QUESTION_REL_PARENT_ID}`)
        const responseAnswerToQuestionRel = apiCallGet(`/typeDataInternalRel?parentId=${process.env.ANSWER_TO_QUESTION_REL_PARENT_ID}`)

        const responseAnswerDetailToAnswerRel = apiCallGet(`/typeDataInternalRel?parentId=${process.env.ANSWER_DETAIL_TO_ANSWER_REL_PARENT_ID}`)

        const results = await Promise.all([responseAllQuestionGroups, responseAllQuestions, responseAllAnswers, responseAllAnswerDetails, responseQuestionToChecklistRel, responseQuestionToQuestionGroupRel, responsePreferredAnswerToQuestionRel, responseAnswerToQuestionRel, responseAnswerDetailToAnswerRel])
      
        const [checklists, addresses, areas, properties, checklistAddressRel, addressPropertyRel, propertyAreaRel] = results.map(el =>{
          return el.data
        })

        console.log("answer results: " + JSON.stringify(results, null, 2))
        const allChecklistsFormatted = []
        for(const i in checklists) {
      
          const el = checklists[i]
      
      
          const checklist = {}
          allChecklistsFormatted.push(checklist)
      
          checklist.id = el.id
          checklist.createdDate = el.created
          checklist.updatedDate = el.updated
      
      
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
      
        return res.json({allChecklistsFormatted, addresses, areas, properties, checklistAddressRel, addressPropertyRel, propertyAreaRel})
      
        // if (( (await responseAllChecklists.status) !== 200) || ((await responseAllAddresses.status ) !== 200) || ((await responseAllAreas.status)  !== 200) ||(( await responseAllProperties.status) !== 200) || ((await responseChecklistAddressRel.status) !== 200) || ((await responseAddressPropertyRel.status) !== 200) || ((await responsePropertyAreaRel.status) !== 200)) {
        //   return res.status(404).json({"message": "Something went wrong"});
        // } else {
        //   return res.json({data: allChecklistsFormatted});
        // }
      
});


module.exports = router;
