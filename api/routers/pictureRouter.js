const express = require("express");
const multer = require("multer");
const router = express.Router();
const fs = require("fs");
const FormData = require('form-data');
const axios = require("axios");
require("dotenv").config();
const { apiCallPut } = require("./helpers.js");
const api = require("./utils/answer/apiCalls.js")
const helper = require("./utils/answer/helpers.js")

const upload = multer({ storage: multer.memoryStorage() })

router.post("/", upload.single('asset'), async (req, res) => {
    console.log("picture route used");

    const form = new FormData();
    const file = req.file;
    const { checklistId, questionId } = req.body

    console.log(checklistId, questionId, "REQ BODY")

    form.append('asset', file.buffer, file.originalname);
    form.append('name', "FILENAME")

    let pictureInstance = await createNewPicture(questionId, checklistId)


    // res.json({msg: "we are cool now"})
})

module.exports = router;


async function createNewPicture(questionId, checklistId, form) {
    let questionObj = await api.getInstance(questionId);
    console.log(questionObj, "questionId")
    const pictureToChecklistRel = await getRelPictureToChecklist()
    console.log(pictureToChecklistRel.data, "pictureToChecklistRel")

    const pictureToQuestionRel = await getRelPictureToQuestion(questionId);
    console.log(pictureToQuestionRel.data, "pictureToQuestionRel")

    const pictureInstance = await createPictureInstance(form);

    // create rel between checklist and picture
    await createRelPictureChecklist(pictureToChecklistRel, pictureInstance, checklistId);
    await createRelPictureQuestion(pictureToQuestionRel, pictureInstance, questionObj);
}

async function getRelPictureToChecklist() {
    let reqBody = {
        sourceId: process.env.PICTURE_PARENT_ID,
        targetId: process.env.CHECKLIST_PARENT_ID
    };
    return await api.getRelType(reqBody);
}


async function getRelPictureToQuestion() {
    let reqBody = {
        sourceId: process.env.PICTURE_PARENT_ID,
        targetId: process.env.CHECKLIST_PARENT_ID
    };
    return await api.getRelType(reqBody);
}

async function createPictureAsset(form) {

    return await axios.post(process.env.API_BASE_URL + "/assets", form, {
        withCredentials: true,
        headers: {
            ...form.getHeaders(),
            apikey: process.env.API_KEY
        }
    });
}


async function createPictureInstance() {
    let reqBody = {
        title: "picture",
        parentId: process.env.PICTURE_PARENT_ID,
        props: []
    };
    return await api.createInstance(reqBody);
}


async function createRelPictureChecklist(pictureToChecklistRel, pictureInstance, id) {
    let reqBody = {
        title: pictureToChecklistRel.data[0].title,
        source: pictureInstance.data.id,
        target: id,
        parentId: pictureToChecklistRel.data[0].id,
        props: []
    };
    return await api.createRelInstance(reqBody);
}

async function createRelPictureQuestion(pictureToQuestionRel, pictureInstance, questionObj) {
    let reqBody = {
        title: pictureToQuestionRel.data[0].title,
        source: pictureInstance.data.id,
        target: questionObj.id,
        parentId: pictureToQuestionRel.data[0].id,
        props: []
    };
    return await api.createRelInstance(reqBody);
}

