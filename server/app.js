/* eslint-disable strict */
const express = require("express");
const app = express();
const path = require("path");
const api = require("./routes/api.js");
app.use('/lanes', api);
app.use("/static", express.static(path.join(__dirname, "public")));
module.exports = app;