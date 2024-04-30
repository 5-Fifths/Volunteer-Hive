// registerController.js
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
    res.sendFile("/webpage/register.html", { root: ROOT_DIR });
};

// POST method
// Register a new user
const registerUser = (req, res) => {
    try {
        const fname = req.body.fname;
        const lname = req.body.lname;
        const username = req.body.username;
        const password = req.body.password;
        const acc_type = req.body.dropdown;

        attemptRegister(fname, lname, username, password, acc_type);

        res.redirect("/login");
    }
    catch (e) {
        console.error(e);
        res.redirect("/");
    }
};

function attemptRegister(fname, lname, username, password, acc_type) {
    try {
        validateUsername(username);
    }
    catch (TypeError) {
        console.error(TypeError);
        return;
    }

    const hash = createHash(password);

    con.query("INSERT INTO login (fname, lname, username, password, acc_type) values (?, ?, ?, ?, ?)", [fname, lname, username, hash, acc_type], function(error, results, fields) {
        if (error) {
            console.error(error);
            return;
        }

        if (results.affectedRows <= 0) {
            res.redirect("/");
            throw new Error("User registration failed.");
        }
    });
}

// Ensure that there is not already an entry
function validateUsername(username) {
    if (typeof username != "string") {
        throw new TypeError("Input is not a string.");
    }

    con.query("SELECT username FROM login WHERE username = ?", [username], (error, results, fields) => {
        if (results.length > 0) {
            throw new Error("User already exists.");
        }
    });
}

module.exports = {
    getPage,
    registerUser
};