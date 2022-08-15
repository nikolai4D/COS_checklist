
//APIs
const express = require("express");
const router = express.Router();
require("dotenv").config();
const bodyParser = require("body-parser");
const helper = require("./utils/answer/helpers.js")

const multer = require("multer");
const fs = require("fs");
const FormData = require('form-data');
const axios = require("axios");
require("dotenv").config();
const api = require("./utils/answer/apiCalls.js");

const upload = multer({ storage: multer.memoryStorage() })


//Bodyparser
router.use(bodyParser.json());

//APIs

router.post("/", async (req, res) => {
    /* 
    This route creates the answers and answer details attached to checklist and questions in checklist instances.
    */

    // const {  checklistId, answer } = req.body;

    // await helper.createNewAnswer(questionObj, question, id);

    // return res.json(200);
    const { answer, questionId, checklistId } = req.body
    let questionObj = await api.getInstance(questionId);
    console.log(questionObj, "questiononbj")

    let question = { id: questionId, selectedAnswer: answer, checklistId };
    let answerInstance = (await helper.createNewAnswer(questionObj, question, checklistId)).data;
    return res.status(200).json(answerInstance)

});



router.put("/", async (req, res) => {

    /* 
    This route updates the answers and answer details attached to checklist and questions in checklist instances.
    */

    const { questionsWithAnswers, questionId, answer, checklistId } = req.body;
    let question = { id: questionId, selectedAnswer: answer }
    let questionObj = await api.getInstance(questionId);

    let existingAnswer = helper.findExistingAnswer(questionsWithAnswers, question)
    if (existingAnswer && helper.isExistingAnswerSameAsNewAnswer(existingAnswer, question)) { console.log(helper.isExistingAnswerSameAsNewAnswer(existingAnswer, question), "HELLO"); return res.json(200); }
    if (existingAnswer) await helper.deleteExistingAnswers(existingAnswer)
    let answerInstance = (await helper.createNewAnswer(questionObj, question, checklistId)).data;

    return res.status(200).json(answerInstance)
});

module.exports = router;


