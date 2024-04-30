// login.js
// Controls routing (GET, POST) for login endpoint

// Modules
const { Router } = require("express");
const bodyParser = require("body-parser");
const controller = require("../controllers/loginController.js");

// Initialization
const router = Router();
const encoder = bodyParser.urlencoded();

// Requests
router.get("/", controller.getPage);
router.post("/", encoder, controller.authenticateUser);

module.exports = router;