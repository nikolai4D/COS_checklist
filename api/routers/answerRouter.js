
//APIs
const express = require("express");
const router = express.Router();
require("dotenv").config();
const bodyParser = require("body-parser");
const helper = require("./utils/answer/helpers.js");

const multer = require("multer");
const fs = require("fs");
const FormData = require('form-data');
const axios = require("axios");
require("dotenv").config();

const upload = multer({ storage: multer.memoryStorage() })


//Bodyparser
router.use(bodyParser.json());

//APIs

router.post("/", upload.single('asset'), async (req, res) => {
    /* 
    This route creates the answers and answer details attached to checklist and questions in checklist instances.
    */


    const { questions, id } = req.body.activeChecklist;

    for (const questionGroup of questions) {
        for (const question of questionGroup.questions) {
            let questionObj;
            // let shouldCreateRelInstanceQuestionChecklist = false;
            // if (question.image) {
            //     shouldCreateRelInstanceQuestionChecklist = true;
            // }

            if (question.selectedAnswer) {
                await helper.createNewAnswer(questionObj, question, id);
                // shouldCreateRelInstanceQuestionChecklist = true;
            }

            if (question.comment) {
                await helper.createNewComment(questionObj, question, id);
                // shouldCreateRelInstanceQuestionChecklist = true;
            }

            // if (shouldCreateRelInstanceQuestionChecklist) {
            await helper.createQuestionRel(question, questionObj, id);
            // }
        }
    }
    return res.json(200);
});



router.put("/", upload.single('asset'), async (req, res) => {

    /* 
    This route updates the answers and answer details attached to checklist and questions in checklist instances.
    */

    const { questionsWithAnswers, questionsWithComments, questions, id } = req.body.activeChecklist;

    for (const questionsGroup of questions) {
        for (const question of questionsGroup.questions) {

            // if (question.image) {
            // console.log(question.image, "IMAGE")
            //     const form = new FormData();
            //     const file = question.image.file;
            //     form.append('asset', file.buffer, file.originalname);
            //     // form.append('parentId', process.env.PICTURE_PARENT_ID)
            //     form.append('props', JSON.stringify([]))

            // console.log(form, "form")


            // const form = new FormData();

            // const file = question.image;
            // console.log(file, `file!! inputImage_$${question.id}`)
            // form.append(`inputImage_$${question.id}`, file.buffer, file.originalname);
            // form.append('parentId',process.env.PICTURE_PARENT_ID)
            // form.append('props', JSON.stringify([]))

            // console.log(question.image.get(`inputImage_$${question.id}`), "hello")

            // console.log(question.image.get(`asset`), "form")
            // console.log(question.image.file, "form")


            // }
            let questionObj;

            let existingComment = helper.findExistingComment(questionsWithComments, question);
            if (question.comment && existingComment)
                await helper.updateComment(existingComment, question);
            else if (question.comment && !existingComment)
                await helper.createNewComment(questionObj, question, id);
            else if (!question.comment && existingComment)
                await helper.deleteComment(existingComment);

            if (question.selectedAnswer) {
                let existingAnswer = helper.findExistingAnswer(questionsWithAnswers, question)
                if (existingAnswer && helper.isExistingAnswerSameAsNewAnswer(existingAnswer, question)) continue;
                if (existingAnswer) await helper.deleteExistingAnswers(existingAnswer);
                await helper.createNewAnswer(questionObj, question, id);
                // await helper.createQuestionRel(question, questionObj, id);
            }
        }
    }
    return res.json(200);
});

module.exports = router;


