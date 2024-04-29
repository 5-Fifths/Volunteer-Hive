const express = require('express');

const app = express();

function sendFileHandler(req, res) {
    res.sendFile(__dirname + req.path + ".html");
}

app.get("/register", sendFileHandler);
app.get("/login", sendFileHandler);
app.get("/admin", sendFileHandler);
app.get("/coordinator", sendFileHandler);
app.get("/volunteer", sendFileHandler);

module.exports = app;