
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

                    const sourcesToAnswer = (await apiCallPost({targetId: matchingObject.answer.id}, `/instance/sourcesToTarget`)).data;
                    if (sourcesToAnswer.links.length > 0){
                        for (const link of sourcesToAnswer.links){
                            let response = await apiCallDelete(`/instance/${link.source}`);
                            if ((await response.status) !== 200) return res.status(response.status).json(response.data);
                        }
                    }

                     await apiCallDelete(`/instance/${matchingObject.answer.id}`)

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
    const checklistObj =(await apiCallGet(`/instance?id=${id}`)).data;

    for (const questionGroup of questions){
        for (const question of questionGroup.questions){
            let questionObj = undefined;
            let createQuestionChecklistRel = false;

            if (question.selectedAnswer){
                // create instance of answer
                questionObj = (await apiCallGet(`/instance?parentId=${question.id}`)).data[0];
                const answerObj = (await apiCallGet(`/type?id=${question.selectedAnswer}`)).data;

                const answerToChecklistRel = (await apiCallPost({sourceId: question.selectedAnswer, targetId: checklistObj.parentId}, `/typeInternalRel/readRelBySourceAndTarget`)).data[0];
                const answerToQuestionRel = (await apiCallPost({sourceId: question.selectedAnswer, targetId: question.id}, `/typeInternalRel/readRelBySourceAndTarget`)).data[0];

                let reqBodyCreateAnswer = {title:answerObj.title, parentId: question.selectedAnswer, props: []};
                const answerInstance = await apiCallPost(reqBodyCreateAnswer, `/instance/create`)

                // create rel between checklist and answer
                let reqBodyAnswerChecklistRel = {title: answerToChecklistRel.title, source: answerInstance.data.id, target: id, parentId: answerToChecklistRel.id, props: []};
                 await apiCallPost(reqBodyAnswerChecklistRel, `/instanceInternalRel/create`)

                // create rel between answer and question

                let reqBodyAnswerQuestionRel = {title: answerToQuestionRel.title, source: answerInstance.data.id, target: questionObj.id, parentId: answerToChecklistRel.id, props: []};
                await apiCallPost(reqBodyAnswerQuestionRel, `/instanceInternalRel/create`)

                createQuestionChecklistRel = true;
                // // create rel between checklist and question

                // let reqBodyQuestionChecklistRel = {title: questionToChecklistRel.title, source: questionObj.id, target: id, parentId: questionToChecklistRel.id, props: []};
                // await apiCallPost(reqBodyQuestionChecklistRel, `/instanceInternalRel/create`)

            }
            if (question.comment){
                questionObj = questionObj ?? (await apiCallGet(`/instance?parentId=${question.id}`)).data[0];

                const commentToChecklistRel = (await apiCallPost({sourceId: process.env.COMMENT_PARENT_ID, targetId: checklistObj.parentId}, `/typeInternalRel/readRelBySourceAndTarget`)).data[0];

                const commentToQuestionRel = (await apiCallPost({sourceId: process.env.COMMENT_PARENT_ID, targetId: question.id}, `/typeInternalRel/readRelBySourceAndTarget`)).data[0];

                // questionToChecklistRel ?? (await apiCallPost({sourceId: question.id, targetId: checklistObj.parentId}, `/typeInternalRel/readRelBySourceAndTarget`)).data[0];

                let reqBodyCreateComment = {title:question.comment, parentId: process.env.COMMENT_PARENT_ID, props: []};
                const commentInstance = await apiCallPost(reqBodyCreateComment, `/instance/create`)


                // create rel between checklist and comment
                let reqBodyCommentChecklistRel = {title: commentToChecklistRel.title, source: commentInstance.data.id, target: id, parentId: commentToChecklistRel.id, props: []};
                await apiCallPost(reqBodyCommentChecklistRel, `/instanceInternalRel/create`)

                // create rel between comment and question

                let reqBodyCommentQuestionRel = {title: commentToQuestionRel.title, source: commentInstance.data.id, target: questionObj.id, parentId: commentToQuestionRel.id, props: []};
                await apiCallPost(reqBodyCommentQuestionRel, `/instanceInternalRel/create`)

                createQuestionChecklistRel = true;

            }
            
            if (createQuestionChecklistRel)    {
                const questionToChecklistRel = (await apiCallPost({sourceId: question.id, targetId: checklistObj.parentId}, `/typeInternalRel/readRelBySourceAndTarget`)).data[0];

                let reqBodyQuestionChecklistRel = {title: questionToChecklistRel.title, source: questionObj.id, target: id, parentId: questionToChecklistRel.id, props: []};
                await apiCallPost(reqBodyQuestionChecklistRel, `/instanceInternalRel/create`)
            }

        }
    }
    return res.json(200);
});


module.exports = router;
