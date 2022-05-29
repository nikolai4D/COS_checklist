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
    const { addressIds, checklistId } = req.body;

    console.log("create address rel route used");

    // get all relationships with address type id to the specific checklist

    let response = (await apiCallGet(`/instanceExternalRel?parentId=${process.env.CHECKLIST_TO_ADDRESS_REL_PARENT_ID}`))
    if ((await response.status) !== 200) return res.status(response.status).json(response.data);
    

   let addressesToChecklist = response.data.filter(link => link.source === checklistId)

    // if the addressId does not exist in array of relationships as a source, create a new relationship
    let toAdd = addressIds.filter(addressId => addressesToChecklist.find(link => link.target === addressId) === undefined)
    
    for (const addressId of toAdd) {
        let reqBody = {};
        reqBody.title = "Has address";
        reqBody.parentId = process.env.CHECKLIST_TO_ADDRESS_REL_PARENT_ID;
        reqBody.props = [];
        reqBody.source = checklistId;
        reqBody.target = addressId;
        
        let response = await apiCallPost(reqBody, `/instanceExternalRel/create`);
        if ((await response.status) !== 200) return res.status(response.status).json(response.data);

    }

    // if there is a relationship source that does not exist in array of address ids, remove relationship
    let toRemove = addressesToChecklist.filter(link => !addressIds.includes(link.target))

    for (const relationship of toRemove) {
       let response =  await apiCallDelete(`/instanceExternalRel/${relationship.id}`);
        if ((await response.status) !== 200) return res.status(response.status).json(response.data);

    }
    return res.json(response.data);


    // if ((await response.status) !== 200) {
    //     return res.status(response.status).json(response.data);
    // }
    // else {
    //     return res.json(response.data);
    // }
    // });
});


module.exports = router;
