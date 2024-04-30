// registerController.js
// Hashes input string (password) and INSERTs to database

// Modules
const bcrypt = require("./hash.js");

// Initialization
const ROOT_DIR = process.env.ROOT_DIR;
const hasher = bcrypt();

// GET method
// Return correct page
const getPage = (req, res) => {
    res.sendFile("/webpage/register.html", { root: ROOT_DIR });
};

// POST method
// Register a new user
const registerUser = (res, req) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        attemptRegister(username, password);

        res.redirect("/login");
    }
    catch (e) {
        console.error(e);
        res.redirect("/");
    }
};

function attemptRegister(username, password) {
    try {
        validateUsername(username);
    }
    catch (TypeError) {
        console.error(TypeError);
        return;
    }

    hash = hasher.createHash(password);

    con.query("INSERT INTO login (username, password) values (?, ?)", [username, hash], function(error, results, fields) {
        if (error) {
            console.error(error);
            return;
        }

        if (results.affectedRows > 0) {
            res.redirect("/login");
        } 
        else {
            res.redirect("/");
            throw new Error("User registration failed.");
        }

        res.end();
    });
}

// Ensure that there is not already an entry
function validateUsername(username) {
    if (typeof username != "string") {
        throw TypeError("Input is not a string.");
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