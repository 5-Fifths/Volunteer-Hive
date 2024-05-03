const express = require('express');
const bodyParser = require("body-parser");
const routes = require('./route');
const { handleRegister, handleLogin, handleProfileEdit } = require('./controller');

const port = 5500;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(routes);

app.post("/Register", handleRegister);
app.post("/Login", handleLogin);
app.post("/Profile-editing-Volunteer", handleProfileEdit);


app.listen(port, () => {
    console.log(`\nServer running on port ${port}`);
});