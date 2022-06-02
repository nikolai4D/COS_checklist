
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

    const {questions, answers, id} = req.body.activeChecklist;


    // check if the answer already exists in the checklist
    let reqBody = {targetId: id};
    let responseSourcesToChecklist = (await apiCallPost(reqBody, `/instances/sourcesToTarget`));
    if ((await responseSourcesToChecklist.status) !== 200) return res.status(responseSourcesToChecklist.status).json(responseSourcesToChecklist.data);

    let links = responseSourcesToChecklist.data.links;

    let answersId = answers.map(answer => answer.id);
    let toIgnore = [];
    if (links.length > 0) toIgnore = links.map(link => link.sources.filter(source => answersId.includes(source.id)));
    console.log(toIgnore, "toIgnore")



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
