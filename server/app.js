/* eslint-disable strict */
const express = require("express");
const app = express();
const api = require("./routes/api.js");
app.use('/lanes', api);
app.use(express.static("../client/build"));
app.get((req, res) => {
    res.status(404).json({"error":"not supported in app"});
})
module.exports = app;