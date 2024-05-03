// loginController.js
// Hashes input string (password) and INSERTs to database

// Modules
const { createHash } = require("./hash.js");
const con = require("./database.js");
require("dotenv/config");

// Initialization
const ROOT_DIR = process.env.ROOT_DIR;

// GET method
// Return correct page
const getPage = (req, res) => {
    res.sendFile("/webpage/login.html", { root: ROOT_DIR });
};

// POST method
// Log in an existing user
const authenticateUser = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (attemptLogin(username, password) == 0) {
        // Authentication success
        req.session.username = username;
        
        res.redirect("/");
    } 
    else {
        // TODO: Output notification about wrong username and/or password
        res.redirect("/login");
    }
};

// Ensure that user exists and login can happen
function attemptLogin(username, password) {
    if (typeValidation({username, password}, "string") == 1) {
        return 1;
    }

    const hash = createHash(password);

    con.query("SELECT 1 FROM login WHERE EXISTS(SELECT * FROM login WHERE username = ? AND password = ?)", [username, hash], (error, results, fields) => {
        if (error) {
            console.error(error);
            return 1;
        }

        if (results.length > 0) {
            return 0;
        } 
        else {
            // Username : Password pair don't exist in the database
            console.error("User authentication failed.");
            return 1;
        }
    });
}

function typeValidation(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (typeof arr[i] != target) {
            return 1;
        }
    }

    return 0;
}

module.exports = {
    getPage,
    authenticateUser
};