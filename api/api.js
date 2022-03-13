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
// api.use("/questions", require("./routers/questionsRouter.js")); //questions
// api.use("/location", require("./routers/locationRouter.js")); //location

module.exports = api;
