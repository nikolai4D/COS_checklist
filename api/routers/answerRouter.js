
//APIs
const express = require("express");
const router = express.Router();
require("dotenv").config();
const bodyParser = require("body-parser");
const axios = require("axios");
const { apiCallPost, apiCallPut, apiCallGet, apiCallDelete } = require("./helpers");

//Bodyparser
router.use(bodyParser.json());

//APIs
router.put("/", async (req, res) => {

    const {questionsWithAnwers, questions, answers, id} = req.body.activeChecklist;

    // if (questionsWithAnwers.length > 0){
        // check if the answers that exists are the ones that are being updated
        // meaning
        // match questions[#].answer[#].questions[#].selectedSelectedAnswer where questions[#].answer[#].questions[#].id === questionsWithAnwers[#].question.parentId, 
        // if selectedAnswer is not questionsWithAnwers[#].answer.parentId, 
        // then delete questionsWithAnwers[#].answer and create instance of selectedAnswer and connect to questionsWithAnwers[#].question.id and checklist
        // if questionsWithAnwers[#].answer.parentId is not questions[#].answer[#].questions[#].selectedAnswer, then it should be removed


    for (const answer of questions){
        for (const question of answer.questions){
            if (question.selectedAnswer){
                let matchingObject = questionsWithAnwers.find(obj => obj.question.parentId === question.id)
                if (matchingObject){
                    if (matchingObject.answer.parentId === question.selectedAnswer) continue;

                    // if (matchingObject.answer.parentId !== question.selectedAnswer){

                        // delete answer nstance if selected answer is not the same as connected answer
                        let responseDeleteAnswer = await apiCallDelete(`/instance/${matchingObject.answer.id}`);
                        if ((await responseDeleteAnswer.status) !== 200) return res.status(responseDeleteAnswer.status).json(responseDeleteAnswer.data);

                        // get relation between checklist and question to delete it later
                        console.log({sourceId: matchingObject.question.id, targetId: id})
                        let responseQuestionToChecklistRel = await apiCallPost({sourceId: matchingObject.question.id, targetId: id}, `/instanceInternalRel/readRelBySourceAndTarget`)
                        if ((await responseQuestionToChecklistRel.status) !== 200) return res.status(responseQuestionToChecklistRel.status).json(responseQuestionToChecklistRel.data);

                        let responseDeleteQuestionToChecklistRel = await apiCallDelete(`/instanceInternalRel/${responseQuestionToChecklistRel.data[0].id}`);
                        if ((await responseDeleteQuestionToChecklistRel.status) !== 200) return res.status(responseDeleteQuestionToChecklistRel.status).json(responseDeleteQuestionToChecklistRel.data);

                    }
                    const answerObj = (await apiCallGet(`/type?id=${question.selectedAnswer}`)).data;
                    const checklistObj =(await apiCallGet(`/instance?id=${id}`)).data;

                    const questionObj = (await apiCallGet(`/instance?parentId=${question.id}`)).data[0];
                    const answerToChecklistRel = (await apiCallPost({sourceId: question.selectedAnswer, targetId: checklistObj.parentId}, `/typeInternalRel/readRelBySourceAndTarget`)).data[0];
                    const answerToQuestionRel = (await apiCallPost({sourceId: question.selectedAnswer, targetId: question.id}, `/typeInternalRel/readRelBySourceAndTarget`)).data[0];
                    const questionToChecklistRel = (await apiCallPost({sourceId: question.id, targetId: checklistObj.parentId}, `/typeInternalRel/readRelBySourceAndTarget`)).data[0];

                    let reqBodyCreateAnswer = {title:answerObj.title, parentId: question.selectedAnswer, props: []};
                    const answerInstance = await apiCallPost(reqBodyCreateAnswer, `/instance/create`)
                    if ((await answerInstance.status) !== 200) return res.status(answerInstance.status).json(answerInstance.data);

                    // create rel between checklist and answer
                    let reqBodyAnswerChecklistRel = {title: answerToChecklistRel.title, source: answerInstance.data.id, target: id, parentId: answerToChecklistRel.id, props: []};
                    let responseAnswerChecklistRel = await apiCallPost(reqBodyAnswerChecklistRel, `/instanceInternalRel/create`)

                    if ((await responseAnswerChecklistRel.status) !== 200) return res.status(responseAnswerChecklistRel.status).json(responseAnswerChecklistRel.data);

                    // create rel between answer and question
                    let reqBodyAnswerQuestionRel = {title: answerToQuestionRel.title, source: answerInstance.data.id, target: questionObj.id, parentId: answerToChecklistRel.id, props: []};
                    const responseCreateAnswerQuestionRel = await apiCallPost(reqBodyAnswerQuestionRel, `/instanceInternalRel/create`)
                    if ((await responseCreateAnswerQuestionRel.status) !== 200) return res.status(responseCreateAnswerQuestionRel.status).json(responseCreateAnswerQuestionRel.data);

                    // create rel between checklist and question
                    let reqBodyQuestionChecklistRel = {title: questionToChecklistRel.title, source: questionObj.id, target: id, parentId: questionToChecklistRel.id, props: []};
                    const responseCreateQuestionChecklistRel = await apiCallPost(reqBodyQuestionChecklistRel, `/instanceInternalRel/create`)
                    if ((await responseCreateQuestionChecklistRel.status) !== 200) return res.status(responseCreateQuestionChecklistRel.status).json(responseCreateQuestionChecklistRel.data);
                    }
                }
            }
    return res.json(200);

});

router.post("/", async (req, res) => {

    const {questions, id} = req.body.activeChecklist;


    for (const answer of questions){
        for (const question of answer.questions){
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
                if ((await answerInstance.status) !== 200) return res.status(answerInstance.status).json(answerInstance.data);

                // create rel between checklist and answer
                let reqBodyAnswerChecklistRel = {title: answerToChecklistRel.title, source: answerInstance.data.id, target: id, parentId: answerToChecklistRel.id, props: []};

                let responseAnswerChecklistRel = await apiCallPost(reqBodyAnswerChecklistRel, `/instanceInternalRel/create`)
                if ((await responseAnswerChecklistRel.status) !== 200) return res.status(responseAnswerChecklistRel.status).json(responseAnswerChecklistRel.data);

                // create rel between answer and question

                let reqBodyAnswerQuestionRel = {title: answerToQuestionRel.title, source: answerInstance.data.id, target: questionObj.id, parentId: answerToChecklistRel.id, props: []};

                const responseCreateAnswerQuestionRel = await apiCallPost(reqBodyAnswerQuestionRel, `/instanceInternalRel/create`)
                if ((await responseCreateAnswerQuestionRel.status) !== 200) return res.status(responseCreateAnswerQuestionRel.status).json(responseCreateAnswerQuestionRel.data);

                // create rel between checklist and question

                let reqBodyQuestionChecklistRel = {title: questionToChecklistRel.title, source: questionObj.id, target: id, parentId: questionToChecklistRel.id, props: []};
                const responseCreateQuestionChecklistRel = await apiCallPost(reqBodyQuestionChecklistRel, `/instanceInternalRel/create`)
                if ((await responseCreateQuestionChecklistRel.status) !== 200) return res.status(responseCreateQuestionChecklistRel.status).json(responseCreateQuestionChecklistRel.data);

            }
        }
    }
return res.json(200);

});


module.exports = router;
