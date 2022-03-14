require("dotenv").config();
const axios = require("axios");

async function apiCallPost(reqBody, url) {
    let response;

    try {
        response = await axios.post(
            process.env.API_BASE_URL + url,
            reqBody,
            {
                withCredentials: true,
                credientials: "include",
                headers: {
                    apikey: process.env.API_KEY,
                },
            }
        );

        console.log("try instance checklist", reqBody.title);
    } catch (err) {
        // Handle Error Here
        response = err.response;
        console.log("catch instance checklist", reqBody.title);
    }
    return response;
}

async function getAll(url) {
    let response;

    try {
        response = await axios.post(
            process.env.API_BASE_URL + url,
            {
                withCredentials: true,
                credientials: "include",
                headers: {
                    apikey: process.env.API_KEY,
                },
            }
        );

        console.log("try instance checklist");
    } catch (err) {
        // Handle Error Here
        response = err.response;
        console.log("catch instance checklist");
    }
    return response;
}


module.exports = { apiCallPost, getAll };