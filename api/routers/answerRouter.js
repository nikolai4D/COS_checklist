
//APIs
const express = require("express");
const router = express.Router();
require("dotenv").config();
const bodyParser = require("body-parser");
const axios = require("axios");
const { apiCallPost, apiCallGet, apiCallDelete } = require("./helpers");

//Bodyparser
router.use(bodyParser.json());

//APIs
router.put("/", async (req, res) => {
    /* 
    This route updates the answers attached to checklist instances.
    */

    const {questionsWithAnwers, questions, id} = req.body.activeChecklist;

    for (const questionsGroup of questions){
        for (const question of questionsGroup.questions){
            if (question.selectedAnswer){
                let matchingObject = questionsWithAnwers.find(obj => obj.question.parentId === question.id)
                if (matchingObject){
                    // if answer instance attached to checklist is same as selected answer then continue to next loop, else delete answer instance
                    if (matchingObject.answer.parentId === question.selectedAnswer) continue;

                    let responseDeleteAnswer = await apiCallDelete(`/instance/${matchingObject.answer.id}`);
                    if ((await responseDeleteAnswer.status) !== 200) return res.status(responseDeleteAnswer.status).json(responseDeleteAnswer.data);

                    // get relation between checklist and question to delete it later
                    let responseQuestionToChecklistRel = await apiCallPost({sourceId: matchingObject.question.id, targetId: id}, `/instanceInternalRel/readRelBySourceAndTarget`)
                    await apiCallDelete(`/instanceInternalRel/${responseQuestionToChecklistRel.data[0].id}`);

                    }
                    const answerObj = (await apiCallGet(`/type?id=${question.selectedAnswer}`)).data;
                    const checklistObj =(await apiCallGet(`/instance?id=${id}`)).data;
                    const questionObj = (await apiCallGet(`/instance?parentId=${question.id}`)).data[0];
                    const answerToChecklistRel = (await apiCallPost({sourceId: question.selectedAnswer, targetId: checklistObj.parentId}, `/typeInternalRel/readRelBySourceAndTarget`)).data[0];
                    const answerToQuestionRel = (await apiCallPost({sourceId: question.selectedAnswer, targetId: question.id}, `/typeInternalRel/readRelBySourceAndTarget`)).data[0];
                    const questionToChecklistRel = (await apiCallPost({sourceId: question.id, targetId: checklistObj.parentId}, `/typeInternalRel/readRelBySourceAndTarget`)).data[0];

                    let reqBodyCreateAnswer = {title:answerObj.title, parentId: question.selectedAnswer, props: []};
                    const answerInstance = await apiCallPost(reqBodyCreateAnswer, `/instance/create`)

                    // create rel between checklist and answer
                    let reqBodyAnswerChecklistRel = {title: answerToChecklistRel.title, source: answerInstance.data.id, target: id, parentId: answerToChecklistRel.id, props: []};
                    await apiCallPost(reqBodyAnswerChecklistRel, `/instanceInternalRel/create`)

                    // create rel between answer and question
                    let reqBodyAnswerQuestionRel = {title: answerToQuestionRel.title, source: answerInstance.data.id, target: questionObj.id, parentId: answerToChecklistRel.id, props: []};
                    await apiCallPost(reqBodyAnswerQuestionRel, `/instanceInternalRel/create`)

                    // create rel between checklist and question
                    let reqBodyQuestionChecklistRel = {title: questionToChecklistRel.title, source: questionObj.id, target: id, parentId: questionToChecklistRel.id, props: []};
                    await apiCallPost(reqBodyQuestionChecklistRel, `/instanceInternalRel/create`)
                    }
                }
            }
    return res.json(200);

});

router.post("/", async (req, res) => {
    /* 
    This route creates the answers attached to checklist instances.
    */


    const {questions, id} = req.body.activeChecklist;

    for (const questionGroup of questions){
        for (const question of questionGroup.questions){
            if (question.selectedAnswer){
                // create instance of answer
                const answerObj = (await apiCallGet(`/type?id=${question.selectedAnswer}`)).data;
                const checklistObj =(await apiCallGet(`/instance?id=${id}`)).data;
                const questionObj = (await apiCallGet(`/instance?parentId=${question.id}`)).data[0];

                const answerToChecklistRel = (await apiCallPost({sourceId: question.selectedAnswer, targetId: checklistObj.parentId}, `/typeInternalRel/readRelBySourceAndTarget`)).data[0];
                const answerToQuestionRel = (await apiCallPost({sourceId: question.selectedAnswer, targetId: question.id}, `/typeInternalRel/readRelBySourceAndTarget`)).data[0];
                const questionToChecklistRel = (await apiCallPost({sourceId: question.id, targetId: checklistObj.parentId}, `/typeInternalRel/readRelBySourceAndTarget`)).data[0];

                let reqBodyCreateAnswer = {title:answerObj.title, parentId: question.selectedAnswer, props: []};
                const answerInstance = await apiCallPost(reqBodyCreateAnswer, `/instance/create`)

                // create rel between checklist and answer
                let reqBodyAnswerChecklistRel = {title: answerToChecklistRel.title, source: answerInstance.data.id, target: id, parentId: answerToChecklistRel.id, props: []};
                 await apiCallPost(reqBodyAnswerChecklistRel, `/instanceInternalRel/create`)

                // create rel between answer and question

                let reqBodyAnswerQuestionRel = {title: answerToQuestionRel.title, source: answerInstance.data.id, target: questionObj.id, parentId: answerToChecklistRel.id, props: []};
                await apiCallPost(reqBodyAnswerQuestionRel, `/instanceInternalRel/create`)

                // create rel between checklist and question

                let reqBodyQuestionChecklistRel = {title: questionToChecklistRel.title, source: questionObj.id, target: id, parentId: questionToChecklistRel.id, props: []};
                await apiCallPost(reqBodyQuestionChecklistRel, `/instanceInternalRel/create`)


                if (question.note){
                    let reqBodyCreateComment = {title:question.note, parentId: process.env.COMMENT_PARENT_ID, props: []};
                    const commentInstance = await apiCallPost(reqBodyCreateComment, `/instance/create`)

                    const questionToChecklistRel = (await apiCallPost({sourceId: commentInstance.data.parentId, targetId: answerInstance.data.parentId}, `/typeInternalRel/readRelBySourceAndTarget`)).data[0];

                    let reqBodyCommentAnswerRel = {title: questionToChecklistRel.title, source: commentInstance.data.id, target: answerInstance.data.id, parentId: questionToChecklistRel.id, props: []};
                    await apiCallPost(reqBodyCommentAnswerRel, `/instanceInternalRel/create`)
                }
            }
        }
    }
    return res.json(200);
});


module.exports = router;
