const express = require("express");
const api = express.Router();
const bodyParser = require("body-parser");

//----------InitDB----------//

// Bodyparser
api.use(bodyParser.json());

//----------auth----------//
api.use("/auth", require("./routers/authRouter.js")); //auth
api.use("/register", require("./routers/registerRouter.js")); //auth
api.use("/verify", require("./routers/verifyRouter.js")); //verify
api.use("/refresh", require("./routers/refreshRouter.js")); //refresh
api.use("/logout", require("./routers/logoutRouter.js")); //logout

//------APIs protected by API key-------//
api.use("/checklist", require("./routers/checklistRouter.js")); //checklist
api.use("/question", require("./routers/questionRouter.js")); //questions
api.use("/address", require("./routers/addressRouter.js")); //address
api.use("/answer", require("./routers/answerRouter.js")); //answer

module.exports = api;
