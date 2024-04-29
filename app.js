const express = require('express');
const bodyParser = require("body-parser");
const routes = require('./route');
const { handleRegister, handleLogin } = require('./controller');

const port = 5500;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(routes);

app.post("/register", handleRegister);
app.post("/login", handleLogin);

app.listen(port, () => {
    console.log(`\nServer running on port ${port}`);
});