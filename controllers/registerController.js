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
    const fname = req.body.fname;
    const lname = req.body.lname;
    const username = req.body.username;
    const password = req.body.password;
    const acc_type = req.body.dropdown;

    if (attemptRegister(fname, lname, username, password, acc_type) == 0) {
        res.redirect("/login");
    }
    else {
        // TODO: Output notification that registration has failed
        res.redirect("/register");
    }
};

// Return 0 for success, 1 for error
function attemptRegister(fname, lname, username, password, acc_type) {
    // Input validation
    let validInput = typeValidation({acc_type}, "number") && typeValidation({fname, lname, username, password}, "string");

    if (validInput == 1) {
        return 1;
    }

    // Ensure that user doesn't already exist in the database
    let query = con.query("SELECT username FROM login WHERE username = ?", [username], (error, results, fields) => {
        if (results.length > 0) {
            console.error("User already exists.");
        }
    });

    if (query.values != null) {
        return 1;
    }

    const hash = createHash(password);

    con.query("INSERT INTO login (fname, lname, username, password, acc_type) values (?, ?, ?, ?, ?)", [fname, lname, username, hash, acc_type], function(error, results, fields) {
        if (error) {
            console.error(error);
            return 1;
        }

        if (results.affectedRows <= 0) {
            console.error("User registration failed.");
            return - 1;
        }
    });

    return 0;
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
    registerUser
};