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
router.get("/getAllDetailedData", async (req, res) => {
        console.log("Get all checklists route used");
      
        // get all question groups, questions, answers and answer details (+ rels)
      
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
      
        const [questionGroups, questions, answers, answerDetails, questionToChecklistRel, questionToQuestionGroupRel, preferredAnswerToQuestionRel, answerToQuestionRel, answerDetailToAnswerRel] = results.map(el =>{
          return el.data
        })


        // add answerDetails to Answers
        const allAnswersFormatted = []
        for(const i in answers) {

          const el = answers[i]
          const answer = {};
          allAnswersFormatted.push(answer);
          answer.id = el.id;
          answer.title = el.title;
          answer.createdDate = el.created;
          answer.updatedDate = el.updated;
          answer.answerDetails = [];


          const answerDetailToAnswer = answerDetailToAnswerRel.filter(relation => relation.target === el.id);
          if(answerDetailToAnswer.length === 0) continue

          answerDetailToAnswer.forEach(relation => {
            let validAnswerDetails = answerDetails.filter(answerDetail => relation.source === answerDetail.id)
            answer.answerDetails.push(...validAnswerDetails)
          })
        }

        // add answers to questions
        const allQuestionsFormatted = []
        for(const i in questions) {

          const el = questions[i]
          const question = {};
          allQuestionsFormatted.push(question);
          question.id = el.id;
          question.title = el.title;
          question.createdDate = el.created;
          question.updatedDate = el.updated;
          question.answers = {possibleAnswers: [], preferredAnswer: null};


          const answerToQuestion = answerToQuestionRel.filter(relation => relation.target === el.id);
          const preferredAnswerToQuestion = preferredAnswerToQuestionRel.find(relation => relation.target === el.id);

          if(answerToQuestion.length != 0) {

          answerToQuestion.forEach(relation => {
            let possibleAnswers = allAnswersFormatted.filter(answer => relation.parentId === process.env.ANSWER_TO_QUESTION_REL_PARENT_ID && relation.source === answer.id)
            question.answers.possibleAnswers.push(...possibleAnswers)
          })
        }
        if(preferredAnswerToQuestion !== undefined) {

          const preferredAnswer = allAnswersFormatted.find(answer => answer.id === preferredAnswerToQuestion.source)
          question.answers.preferredAnswer = preferredAnswer
        }}

        // add questions to question groups

        const allQuestionGroupsFormatted = []
        for(const i in questionGroups) {

          const el = questionGroups[i]

          const questionGroup = {};
          allQuestionGroupsFormatted.push(questionGroup)
          questionGroup.id = el.id
          questionGroup.title = el.title;
          questionGroup.createdDate = el.created
          questionGroup.updatedDate = el.updated
          questionGroup.questions = []

          const questionToQuestionGroup = questionToQuestionGroupRel.filter(relation => relation.target === el.id);
          if(questionToQuestionGroup.length === 0) continue

          questionToQuestionGroup.forEach(relation => {
            let question = allQuestionsFormatted.filter(question => relation.source === question.id)
            questionGroup.questions.push(...question)
          })
        }

      
        return res.json({questionsDetailed: allQuestionGroupsFormatted})
      
        // if (( (await responseAllChecklists.status) !== 200) || ((await responseAllquestions.status ) !== 200) || ((await responseAllanswers.status)  !== 200) ||(( await responseAllanswerDetails.status) !== 200) || ((await responsequestionToChecklistRel.status) !== 200) || ((await responsequestionToQuestionGroup.status) !== 200) || ((await responsepreferredAnswerToQuestionRel, answerToQuestionRel, answerDetailToAnswerRel.status) !== 200)) {
        //   return res.status(404).json({"message": "Something went wrong"});
        // } else {
        //   return res.json({data: allChecklistsFormatted});
        // }
      
});


module.exports = router;
