
//APIs
const express = require("express");
const router = express.Router();
require("dotenv").config();
const bodyParser = require("body-parser");
const { apiCallPost, apiCallGet, apiCallDelete, apiCallPut } = require("./helpers");

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

                        let response = await apiCallPut({...matchingObjectQuestionComment.comment}, `/instanceData/update`);
                        if ((await response.status) !== 200) return res.status(response.status).json(response.data);
                    }}
                else {

                    const commentToChecklistRel = (await apiCallPost({sourceId: process.env.COMMENT_PARENT_ID, targetId: process.env.CHECKLIST_PARENT_ID}, `/typeInternalRel/readRelBySourceAndTarget`));
                    if ((await commentToChecklistRel.status) !== 200) return res.status(commentToChecklistRel.status).json(commentToChecklistRel.data);

                    const commentToQuestionRel = (await apiCallPost({sourceId: process.env.COMMENT_PARENT_ID, targetId: question.id}, `/typeInternalRel/readRelBySourceAndTarget`));

                    if ((await commentToQuestionRel.status) !== 200) return res.status(commentToQuestionRel.status).json(commentToQuestionRel.data);

    
                    let reqBodyCreateComment = {title:question.comment, parentId: process.env.COMMENT_PARENT_ID, props: []};
                    const commentInstance = (await apiCallPost(reqBodyCreateComment, `/instance/create`))
    
    
                    // create rel between checklist and comment
                    let reqBodyCommentChecklistRel = {title: commentToChecklistRel.data[0].title, source: commentInstance.data.id, target: id, parentId: commentToChecklistRel.data[0].id, props: []};

                    let response = await apiCallPost(reqBodyCommentChecklistRel, `/instanceInternalRel/create`)

                    if ((await response.status) !== 200) return res.status(response.status).json(response.data);
                    // create rel between comment and question

                    questionObj = (await apiCallGet(`/instance?parentId=${question.id}`)).data[0];

    
                    let reqBodyCommentQuestionRel = {title: commentToQuestionRel.data[0].title, source: commentInstance.data.id, target: questionObj.id, parentId: commentToQuestionRel.data[0].id, props: []};
                    let response1= await apiCallPost(reqBodyCommentQuestionRel, `/instanceInternalRel/create`)
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

                    await apiCallDelete(`/instance/${matchingObject.answer.id}`)

                    }
                    const answerObj = (await apiCallGet(`/type?id=${question.selectedAnswer}`)).data;
                    const answerToChecklistRel = (await apiCallPost({sourceId: question.selectedAnswer, targetId: process.env.CHECKLIST_PARENT_ID}, `/typeInternalRel/readRelBySourceAndTarget`)).data[0];
                    const answerToQuestionRel = (await apiCallPost({sourceId: question.selectedAnswer, targetId: question.id}, `/typeInternalRel/readRelBySourceAndTarget`)).data[0];
                    const questionToChecklistRel = (await apiCallPost({sourceId: question.id, targetId: process.env.CHECKLIST_PARENT_ID}, `/typeInternalRel/readRelBySourceAndTarget`)).data[0];

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
    const checklistObj = (await apiCallGet(`/instance?id=${id}`)).data;

    for (const questionGroup of questions){
        for (const question of questionGroup.questions){
            let questionObj = undefined;
            let shouldCreateRelQuestionChecklist = false;

            if (question.selectedAnswer){
                // create instance of answer
                ({ questionObj, shouldCreateRelQuestionChecklist } = await createAnswerToQuestionInChecklist(questionObj, question, shouldCreateRelQuestionChecklist));

            }
            if (question.comment){
                ({ questionObj, shouldCreateRelQuestionChecklist } = await createCommentToQuestionInChecklist(questionObj, question, shouldCreateRelQuestionChecklist));
            }
            
            if (shouldCreateRelQuestionChecklist)    {
                await createRelQuestionToChecklist(question, questionObj);
            }

        }
    }
    return res.json(200);



    async function createRelQuestionToChecklist(question, questionObj) {
        const questionToChecklistRel = (await apiCallPost({ sourceId: question.id, targetId: checklistObj.parentId }, `/typeInternalRel/readRelBySourceAndTarget`)).data[0];

        let reqBodyQuestionChecklistRel = { title: questionToChecklistRel.title, source: questionObj.id, target: id, parentId: questionToChecklistRel.id, props: [] };
        await apiCallPost(reqBodyQuestionChecklistRel, `/instanceInternalRel/create`);
    }

    async function createCommentToQuestionInChecklist(questionObj, question, shouldCreateRelQuestionChecklist) {
        questionObj = questionObj ?? (await apiCallGet(`/instance?parentId=${question.id}`)).data[0];

        const commentToChecklistRel = (await apiCallPost({ sourceId: process.env.COMMENT_PARENT_ID, targetId: checklistObj.parentId }, `/typeInternalRel/readRelBySourceAndTarget`)).data[0];

        const commentToQuestionRel = (await apiCallPost({ sourceId: process.env.COMMENT_PARENT_ID, targetId: question.id }, `/typeInternalRel/readRelBySourceAndTarget`)).data[0];

        let reqBodyCreateComment = { title: question.comment, parentId: process.env.COMMENT_PARENT_ID, props: [] };
        const commentInstance = await apiCallPost(reqBodyCreateComment, `/instance/create`);

        // create rel between checklist and comment
        let reqBodyCommentChecklistRel = { title: commentToChecklistRel.title, source: commentInstance.data.id, target: id, parentId: commentToChecklistRel.id, props: [] };
        await apiCallPost(reqBodyCommentChecklistRel, `/instanceInternalRel/create`);

        // create rel between comment and question
        let reqBodyCommentQuestionRel = { title: commentToQuestionRel.title, source: commentInstance.data.id, target: questionObj.id, parentId: commentToQuestionRel.id, props: [] };
        await apiCallPost(reqBodyCommentQuestionRel, `/instanceInternalRel/create`);

        shouldCreateRelQuestionChecklist = true;
        return { questionObj, shouldCreateRelQuestionChecklist };
    }

    async function createAnswerToQuestionInChecklist(questionObj, question, shouldCreateRelQuestionChecklist) {
        questionObj = await getQuestion(questionObj, question);
        const answerObj = await getAnswersParent(question);
        const answerToChecklistRel = await getRelAnswerToChecklist(question);
        const answerToQuestionRel = await getRelAnswerToQuestion(question);
        const answerInstance = await createAnswer(answerObj, question);

        await createRelAnswerChecklist(answerToChecklistRel, answerInstance);
        await createRelAnswerQuestion(answerToQuestionRel, answerInstance, questionObj, answerToChecklistRel);

        shouldCreateRelQuestionChecklist = true;
        return { questionObj, shouldCreateRelQuestionChecklist };
    }
    

    async function createRelAnswerQuestion(answerToQuestionRel, answerInstance, questionObj, answerToChecklistRel) {
        let reqBodyAnswerQuestionRel = { title: answerToQuestionRel.title, source: answerInstance.data.id, target: questionObj.id, parentId: answerToChecklistRel.id, props: [] };
        await apiCallPost(reqBodyAnswerQuestionRel, `/instanceInternalRel/create`);
    }

    async function createRelAnswerChecklist(answerToChecklistRel, answerInstance) {
        let reqBodyAnswerChecklistRel = { title: answerToChecklistRel.title, source: answerInstance.data.id, target: id, parentId: answerToChecklistRel.id, props: [] };
        await apiCallPost(reqBodyAnswerChecklistRel, `/instanceInternalRel/create`);
    }

    async function createAnswer(answerObj, question) {
        let reqBodyCreateAnswer = { title: answerObj.title, parentId: question.selectedAnswer, props: [] };
        const answerInstance = await apiCallPost(reqBodyCreateAnswer, `/instance/create`);
        return answerInstance;
    }
    async function getRelAnswerToQuestion(question) {
        return await getRel(question.selectedAnswer,  question.id );
    }

    async function getRelAnswerToChecklist(question) {
        return await getRel(question.selectedAnswer, checklistObj.parentId);    
    }

    async function getRel(sourceId, targetId) {
        return (await apiCallPost({ sourceId, targetId }, `/typeInternalRel/readRelBySourceAndTarget`)).data[0];
    }

    async function getAnswersParent(question) {
        return (await apiCallGet(`/type?id=${question.selectedAnswer}`)).data;
    }

    async function getQuestion(questionObj, question) {
        questionObj = (await apiCallGet(`/instance?parentId=${question.id}`)).data[0];
        return questionObj;
    }
});


module.exports = router;
