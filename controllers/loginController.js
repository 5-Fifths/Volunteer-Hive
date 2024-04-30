// loginController.js
// Hashes input string (password) and INSERTs to database

// Modules
const bcrypt = require("./hash.js");

// Initialization
const ROOT_DIR = process.env.ROOT_DIR;
const hasher = bcrypt();

// GET method
// Return correct page
const getPage = (req, res) => {
    res.sendFile("/webpage/login.html", { root: ROOT_DIR });
};

// POST method
// Login an existing user
const authenticateUser = (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        try {
            validateUsername(username);
            validateString(password);
        } 
        catch (e) {
            console.error(e);
            return;
        }

        attemptLogin(username, password);
        res.redirect("/"); // send to dashboard?
    }
    catch (e) {
        console.error(e);
        res.redirect("/");
        return;
    }
};

// Ensure that user exists and login can happen
function attemptLogin(username, password) {
    try {
        validateUsername(username);
    }
    catch (TypeError) {
        console.error(TypeError);
    }

    hash = hasher.createHash(password);

    con.query("SELECT EXISTS(SELECT * FROM login WHERE username = ? AND password = ?)", [username, hash], (error, results, fields) => {
        if (error) {
            console.error(error);
            return;
        }
    });

    con.query("INSERT INTO login (username, password) values (?, ?)", [username, hash], function(error, results, fields) {
        if (error) {
            console.error(error);
            res.redirect("/login");
            return;
        }

        if (results.affectedRows > 0) {
            res.redirect("/"); // Send to dashboard
        } 
        else {
            res.redirect("/");
            throw new Error("User authentication failed.");
        }

        res.end();
    });
}

function validateString(string) {
    if (typeof string != "string") {
        throw TypeError("Input is not a string.");
    }
}

// Ensure that there is not already an entry
function validateUsername(username) {
    validateString(username);

    con.query("SELECT username FROM login WHERE username = ?", [username], (error, results, fields) => {
        if (error) {
            console.error(error);
            return;
        }

        if (results.length <= 0) {
            throw new Error("User doesn't exist.");
        }
    });
}

module.exports = {
    getPage,
    authenticateUser
};