
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
            let questionObj = undefined;
            let hasComment = true;

            let matchingObjectQuestionComment = questionsWithComments.find(obj => obj.question.parentId === question.id)

            if (question.comment){
                if (matchingObjectQuestionComment){
                    if (matchingObjectQuestionComment.comment.title !== question.comment){
                        matchingObjectQuestionComment.comment.title = question.comment;

                        let response = await updateCommentInstance(matchingObjectQuestionComment);
                        if ((await response.status) !== 200) return res.status(response.status).json(response.data);
                    }
                }
                else {

                    const commentToChecklistRel = await helper.getRelCommentToChecklist();
                    if ((await commentToChecklistRel.status) !== 200) return res.status(commentToChecklistRel.status).json(commentToChecklistRel.data);

                    const commentToQuestionRel = await helper.getRelCommentToQuestion(question);
                    if ((await commentToQuestionRel.status) !== 200) return res.status(commentToQuestionRel.status).json(commentToQuestionRel.data);

                    const commentInstance = await helper.createCommentInstance(question);

                    // create rel between checklist and comment
                    let response = await helper.createRelCommentChecklist(commentToChecklistRel, commentInstance, id);

                    if ((await response.status) !== 200) return res.status(response.status).json(response.data);
                    // create rel between comment and question

                    questionObj = (await apiCallGet(`/instance?parentId=${question.id}`)).data[0];

                    let response1 = await helper.createRelCommentQuestion(commentToQuestionRel, commentInstance, questionObj);
                    if ((await response1.status) !== 200) return res.status(response1.status).json(response1.data);

                }
                }

            else if(!question.comment && matchingObjectQuestionComment){
                if (matchingObjectQuestionComment.comment) await apiCallDelete(`/instance/${matchingObjectQuestionComment.comment.id}`);
                hasComment = false;

            }

            if (question.selectedAnswer){
                questionObj = (await apiCallGet(`/instance?parentId=${question.id}`)).data[0];

                let matchingObject = questionsWithAnwers.find(obj => obj.question.parentId === question.id)
                if (matchingObject){
                    // if answer instance attached to checklist is same as selected answer then continue to next loop, else delete answer instance
                    if (matchingObject.answer.parentId === question.selectedAnswer) continue;

                    const sourcesToAnswer = (await apiCallPost({targetId: matchingObject.answer.id}, `/instance/sourcesToTarget`)).data;
                    if (sourcesToAnswer.links.length > 0){
                        for (const link of sourcesToAnswer.links){
                            let response = await apiCallDelete(`/instance/${link.source}`);
                            if ((await response.status) !== 200) return res.status(response.status).json(response.data);
                        }
                    }

                    await apiCallDelete(`/instance/${matchingObject.answer.id}`);

                    }
                    const answerObj = await helper.getType(question);
                    const answerToChecklistRel = await helper.getRelAnswerToChecklist(question);
                    const answerToQuestionRel = await helper.getRelAnswerToQuestion(question);

                    const answerInstance = await helper.createAnswerInstance(answerObj, question);

                    // create rel between checklist and answer
                    await helper.createRelAnswerChecklist(answerToChecklistRel, answerInstance, id);

                    // create rel between answer and question
                    await helper.createRelAnswerQuestion(answerToQuestionRel, answerInstance, questionObj, answerToChecklistRel);


                    const questionToChecklistRel = await helper.getRelQuestionToChecklist(question);
                    // create rel between checklist and question
                    await helper.createRelQuestionChecklist(questionToChecklistRel, questionObj, id);
                    }

            }
        }
    return res.json(200);


    async function updateCommentInstance(matchingObjectQuestionComment) {
        return await apiCallPut({ ...matchingObjectQuestionComment.comment }, `/instanceData/update`);
    }
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
            createQuestionChecklistRel = false; 
            if (question.selectedAnswer){
                // create instance of answer
                questionObj = questionObj ?? (await apiCallGet(`/instance?parentId=${question.id}`)).data[0];
                
                const answerObj = await helper.getType(question);
                const answerToChecklistRel = await helper.getRelAnswerToChecklist(question);
                const answerToQuestionRel = await helper.getRelAnswerToQuestion(question);
                const answerInstance = await helper.createAnswerInstance(answerObj, question);

                // create rel between checklist and answer
                await helper.createRelAnswerChecklist(answerToChecklistRel, answerInstance, id);

                // create rel between answer and question
                await helper.createRelAnswerQuestion(answerToQuestionRel, answerInstance, questionObj, answerToChecklistRel);

                createQuestionChecklistRel = true;

            }
            if (question.comment){
                questionObj = questionObj ?? (await apiCallGet(`/instance?parentId=${question.id}`)).data[0];

                const commentToChecklistRel = await helper.getRelCommentToChecklist();
                if ((await commentToChecklistRel.status) !== 200) return res.status(commentToChecklistRel.status).json(commentToChecklistRel.data);

                const commentToQuestionRel = await helper.getRelCommentToQuestion(question);
                if ((await commentToQuestionRel.status) !== 200) return res.status(commentToQuestionRel.status).json(commentToQuestionRel.data);

                const commentInstance = await helper.createCommentInstance(question);

                // create rel between checklist and comment
                let response = await helper.createRelCommentChecklist(commentToChecklistRel, commentInstance, id);

                if ((await response.status) !== 200) return res.status(response.status).json(response.data);
                // create rel between comment and question

                let response1 = await helper.createRelCommentQuestion(commentToQuestionRel, commentInstance, questionObj);
                if ((await response1.status) !== 200) return res.status(response1.status).json(response1.data);
                createQuestionChecklistRel = true;
            }

            if (createQuestionChecklistRel)    {
                const questionToChecklistRel = await helper.getRelQuestionToChecklist(question);
                await helper.createRelQuestionChecklist(questionToChecklistRel, questionObj, id);
            }
        }
    }
    return res.json(200);
});


module.exports = router;

