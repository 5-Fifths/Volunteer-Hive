// hash.js
// Handles hashing for register and login controllers

// Modules
const bcrypt = require("bcrypt");

// Initialization
const SALT_ROUNDS = 10;

// Returns hashed password from password string
function createHash(password) {
    try {
        validateInput(password);
    } catch (TypeError) {
        console.error(TypeError);
    }

    return bcrypt.hashSync(password, SALT_ROUNDS);
};

// Ensure that password is a string
function validateInput(password) {
    if (password == null || password == "") {
        throw new TypeError("Input is null.");
    }

    if (typeof password != "string") {
        throw new TypeError("Input is not a string.");
    }
}

module.exports = { createHash };