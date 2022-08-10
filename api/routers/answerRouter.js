
//APIs
const express = require("express");
const router = express.Router();
require("dotenv").config();
const bodyParser = require("body-parser");
const { apiCallPost, apiCallGet, apiCallDelete, apiCallPut } = require("./helpers");
const helper  = require("./utils/answerHelpers.js");

//Bodyparser
router.use(bodyParser.json());

//APIs
router.put("/", async (req, res) => {
    /* 
    This route updates the answers attached to checklist instances.
    */

    const {questionsWithAnswers, questionsWithComments, questions, id} = req.body.activeChecklist;

    for (const questionsGroup of questions){
        for (const question of questionsGroup.questions){
            let questionObj;

            await helper.updateDbWithComments(questionObj, questionsWithComments, question, id);

            if (question.selectedAnswer){
                let existingAnswer = helper.findExistingAnswer(questionsWithAnswers, question)
                if (existingAnswer && existingAnswer.answer.parentId === question.selectedAnswer) continue;
                if (existingAnswer) await helper.deleteExistingAnswers(existingAnswer);
                await helper.createNewAnswer(questionObj, question, id);
                await helper.createQuestionRel(question,questionObj, id);
                }
            }
        }
    return res.json(200);
});

router.post("/", async (req, res) => {
    /* 
    This route creates the answers and answer details attached to checklist and questions in checklist instances.
    */

    const {questions, id} = req.body.activeChecklist;

    for (const questionGroup of questions){
        for (const question of questionGroup.questions){
            let questionObj;
            shouldCreateRelInstanceQuestionChecklist = false; 

            if (question.selectedAnswer){
                await helper.createNewAnswer(questionObj, question, id);
                shouldCreateRelInstanceQuestionChecklist = true;
            }

            if (question.comment){
                await helper.createNewComment(questionObj, question, id);
                shouldCreateRelInstanceQuestionChecklist = true;
            }

            if (shouldCreateRelInstanceQuestionChecklist){
                await helper.createQuestionRel(question, questionObj, id);
            }
        }
    }
    return res.json(200);
});


module.exports = router;

