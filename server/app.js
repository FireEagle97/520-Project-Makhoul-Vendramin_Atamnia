/* eslint-disable strict */
const express = require("express");
const app = express();
const api = require("./routes/api.js");
app.use('/lanes', api);
app.use(express.static("../client/build"));
module.exports = app;