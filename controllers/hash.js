// hash.js
// Handles hashing for register and login controllers

// Modules
const bcrypt = require("bcrypt");
require("dotenv/config");

// Initialization
const SALT_ROUNDS = process.env.SALT_ROUNDS;

// Returns hashed password from password string
function createHash(password) {
    try {
        validateInput(password);
    } catch (TypeError) {
        console.error(TypeError);
    }

    bcrypt.genSalt(SALT_ROUNDS, (error, salt) => {
        bcrypt.hash(password, salt, (error, hash) => {
            if (error) {
                console.error(error);
                return;
            }
    
            return hash;
        });
    });
};

// Ensure that password is a string
function validateInput(password) {
    if (password == null) {
        throw TypeError("Input is null.");
    }

    if (typeof password != "string") {
        throw TypeError("Input is not a string.");
    }
}

module.exports = createHash;