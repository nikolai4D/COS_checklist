const express = require("express");
const api = express.Router();
const bodyParser = require("body-parser");
const verifyAccess = require("./middleware/verifyAccess.js");

//----------InitDB----------//

// Bodyparser
api.use(bodyParser.json());

//----------auth----------//
api.use("/auth", require("./routers/authRouter.js")); //auth
api.use("/register", require("./routers/registerRouter.js")); //auth
api.use("/verify", require("./routers/verifyRouter.js")); //verify
api.use("/refresh", require("./routers/refreshRouter.js")); //refresh
api.use("/logout", require("./routers/logoutRouter.js")); //logout

//PROTECTED APIs//
api.use(verifyAccess);

module.exports = api;
