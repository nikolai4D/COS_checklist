const express = require("express");
const multer = require("multer");
const router = express.Router();
const fs = require("fs");
const FormData = require('form-data');
const axios = require("axios");
require("dotenv").config();


const upload = multer({ storage: multer.memoryStorage() })

router.post("/",  upload.single ('answer_picture'),async (req, res) => {
    console.log("picture route used");

    console.log("file: " + JSON.stringify(req.file))

    const form = new FormData();
    const file = req.file;
    form.append('answer_picture', file.buffer, file.originalname);
    form.append('parentId',process.env.PICTURE_PARENT_ID)
    form.append('props', JSON.stringify([]))


    console.log(form, "form")
    

    const response = await axios.post(process.env.API_BASE_URL + "/assets" , form, {
        withCredentials: true,
        headers: {
            ...form.getHeaders(),
            apikey: process.env.API_KEY}
    });

    // res.json({msg: "we are cool now"})
})

module.exports = router;