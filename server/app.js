/* eslint-disable strict */
const express = require("express");
const app = express();
const api = require("./routes/api.js");
const compression = require("compression");

app.use('/lanes', api);
//server compression
app.use(compression());
//browser caching
app.use(function (req, res, next) {
    res.set("Cache-control", "public, max-age=31536000");
    next();
});
app.use(express.static("../client/build"));
app.get((req, res) => {
    res.status(404).json({"error":"not supported in app"});
})
module.exports = app;