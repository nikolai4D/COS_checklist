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

    const file = req.file;
    const { checklistId, questionId } = req.body
    const form = new FormData();

    let pictureInstance = await createNewPicture(questionId, checklistId, form)
    form.append('asset', file.buffer, file.originalname);
    form.append('name', `as_${pictureInstance.id}`)
    createPictureAsset(form)
    // res.json({msg: "we are cool now"})
})

module.exports = router;


async function createNewPicture(questionId, checklistId, form) {
    let questionObj = await api.getInstance(questionId);
    const pictureToChecklistRel = await getRelPictureToChecklist()
    const pictureToQuestionRel = await getRelPictureToQuestion(questionId);
    const pictureInstance = await createPictureInstance(form);

    // create rel between checklist and picture
    await createRelPictureChecklist(pictureToChecklistRel, pictureInstance, checklistId);
    await createRelPictureQuestion(pictureToQuestionRel, pictureInstance, questionObj);
    return pictureInstance.data;
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

