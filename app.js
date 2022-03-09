const express = require("express");
const path = require("path");
const cors = require("cors");
const initDotEnv = require("./api/middleware/initDotEnv.js");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 3000;
const app = express();

//Init app

// Cross Origin Resource Sharing
app.use(cors());

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

// Api
// app.use("/api", require("./api/api.js"));

// Set static protected folder
app.use("/", express.static(__dirname + "/public"));

// Redirect to link
app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

initDotEnv();
app.listen(PORT, () => console.log(`App running on port ${PORT}`));
