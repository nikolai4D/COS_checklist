
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

    const {questionsWithAnwers, questionsWithComments, questions, id} = req.body.activeChecklist;

    for (const questionsGroup of questions){
        for (const question of questionsGroup.questions){
            let questionObj;

            await updateDbWithComments(questionObj, questionsWithComments, question, id);

            if (question.selectedAnswer){
                let existingAnswer = findExistingAnswer(questionsWithAnwers, question)
                if (existingAnswer && existingAnswer.answer.parentId === question.selectedAnswer) continue;
                if (existingAnswer) await deleteExistingAnswers(existingAnswer);
                await createAnswer(questionObj, question, id);
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
    const checklistObj = (await apiCallGet(`/instance?id=${id}`)).data;

    for (const questionGroup of questions){
        for (const question of questionGroup.questions){
            let questionObj;
            shouldCreateRelInstanceQuestionChecklist = false; 

            if (question.selectedAnswer){
                await createAnswer(questionObj, question, id);
                shouldCreateRelInstanceQuestionChecklist = true;
            }

            if (question.comment){
                await createNewComment(questionObj, question, id);
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

async function updateDbWithComments(questionObj, questionsWithComments, question, id) {
    let existingComment = findExistingComment(questionsWithComments, question);
    if (question.comment && existingComment)
        await updateComment(existingComment, question);
    else if (question.comment && !existingComment)
        await createNewComment(questionObj, question, id);
    else if (!question.comment && existingComment)
        await deleteComment(existingComment);
}

async function createAnswer(questionObj, question, id) {
    questionObj = questionObj ?? (await apiCallGet(`/instance?parentId=${question.id}`)).data[0];

    const answerObj = await helper.readType(question.selectedAnswer);
    const answerToChecklistRel = await helper.getRelAnswerToChecklist(question);
    const answerToQuestionRel = await helper.getRelAnswerToQuestion(question);
    const answerInstance = await helper.createAnswerInstance(answerObj, question);

    // create rel between checklist and answer
    await helper.createAnswerRels(answerToChecklistRel, answerInstance, id, answerToQuestionRel, questionObj);
}

function findExistingAnswer(questionsWithAnwers, question) {
    return questionsWithAnwers.find(obj => obj.question.parentId === question.id);
}

async function deleteComment(existingComment) {
    if (existingComment.comment)
        await apiCallDelete(`/instance/${existingComment.comment.id}`);
}

function findExistingComment(questionsWithComments, question) {
    return questionsWithComments.find(obj => obj.question.parentId === question.id);
}

async function deleteExistingAnswers(matchingObject) {
    const sourcesToAnswer = (await apiCallPost({ targetId: matchingObject.answer.id }, `/instance/sourcesToTarget`)).data;
    if (sourcesToAnswer.links.length > 0) {
        for (const link of sourcesToAnswer.links) {
            await apiCallDelete(`/instance/${link.source}`);
        }
    }
    await apiCallDelete(`/instance/${matchingObject.answer.id}`);
}

async function updateComment(matchingObjectQuestionComment, question) {
    if (matchingObjectQuestionComment.comment.title !== question.comment) {
        matchingObjectQuestionComment.comment.title = question.comment;
        await apiCallPut({ ...matchingObjectQuestionComment.comment }, `/instanceData/update`);
    }
}

async function createNewComment(questionObj, question, id) {
    questionObj = questionObj ?? (await apiCallGet(`/instance?parentId=${question.id}`)).data[0];

    let commentToChecklistRel, commentInstance, commentToQuestionRel;
    ({ commentToChecklistRel, commentInstance, commentToQuestionRel } = await helper.createComment(questionObj, question));

    // create rel between checklist and comment
    await helper.createRelCommentChecklist(commentToChecklistRel, commentInstance, id);
    await helper.createRelCommentQuestion(commentToQuestionRel, commentInstance, questionObj);
}

