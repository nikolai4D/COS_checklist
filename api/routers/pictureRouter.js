const express = require("express");
const multer = require("multer");
const router = express.Router();
const fs = require("fs");
require("dotenv").config();

const bodyParser = require("body-parser");
const { apiCallPost, apiCallGet, apiCallDelete } = require("./helpers");

const upload = multer({ storage: multer.memoryStorage() })

//Bodyparser
//router.use(bodyParser.json());

router.post("/",  upload.single ('answer_picture'),(req, res) => {
    console.log("picture route used");

    // Open file as a readable stream
    //const fileStream = fs.createReadStream('./large-file.zip');

    //const form = new FormData();
    // Pass file stream directly to form
    //form.append('largeFile', fileStream, 'large-file.zip');

    console.log("file: " + JSON.stringify(req.file))
    res.json({msg:"we are cool now"})
})

module.exports = router;