const express = require("express");
const router = express.Router();
require("dotenv").config();
const bodyParser = require("body-parser");
const axios = require("axios");
const { apiCallPost, apiCallGet, apiCallDelete } = require("./helpers");
const { add } = require("lodash");
const { address } = require("faker/locale/zh_TW");

//Bodyparser
router.use(bodyParser.json());

//APIs

router.post("/", async (req, res) => {
    const {checklistId, questionId, answerId} = req.body;
    const answerObj = (await apiCallGet(`/type?id=${answerId}`)).data;
    const checklistObj =(await apiCallGet(`/instance?id=${checklistId}`)).data;

    const questionObj = (await apiCallGet(`/instance?parentId=${questionId}`)).data[0];
    const answerToChecklistRel = (await apiCallPost({sourceId: answerId, targetId: checklistObj.parentId}, `/typeInternalRel/readRelBySourceAndTarget`)).data[0];
    const answerToQuestionRel = (await apiCallPost({sourceId: answerId, targetId: questionId}, `/typeInternalRel/readRelBySourceAndTarget`)).data[0];
    const questionToChecklistRel = (await apiCallPost({sourceId: questionId, targetId: checklistObj.parentId}, `/typeInternalRel/readRelBySourceAndTarget`)).data[0];

    let reqBodyCreateAnswer = {title:answerObj.title, parentId: answerId, props: []};
    
    // create instance of answer

    const answerInstance = await apiCallPost(reqBodyCreateAnswer, `/instance/create`)
    if ((await answerInstance.status) !== 200) return res.status(answerInstance.status).json(answerInstance.data);

    // create rel between checklist and answer
    let reqBodyAnswerChecklistRel = {title: answerToChecklistRel.title, source: answerInstance.data.id, target: checklistId, parentId: answerToChecklistRel.id, props: []};

    let responseAnswerChecklistRel = await apiCallPost(reqBodyAnswerChecklistRel, `/instanceInternalRel/create`)
    if ((await responseAnswerChecklistRel.status) !== 200) return res.status(responseAnswerChecklistRel.status).json(responseAnswerChecklistRel.data);

    // create rel between answer and question

    let reqBodyAnswerQuestionRel = {title: answerToQuestionRel.title, source: answerInstance.data.id, target: questionObj.id, parentId: answerToChecklistRel.id, props: []};

    const responseCreateAnswerQuestionRel = await apiCallPost(reqBodyAnswerQuestionRel, `/instanceInternalRel/create`)

        // create rel between checklist and question

    let reqBodyQuestionChecklistRel = {title: questionToChecklistRel.title, source: questionObj.id, target: checklistId, parentId: questionToChecklistRel.id, props: []};

    const responseCreateQuestionChecklistRel = await apiCallPost(reqBodyQuestionChecklistRel, `/instanceInternalRel/create`)


    return res.json(responseCreateAnswerQuestionRel.data);

});


module.exports = router;
