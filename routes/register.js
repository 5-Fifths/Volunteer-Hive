// register.js
// Controls routing (GET, POST) for register endpoint

// Modules
const { Router } = require("express");
const bodyParser = require("body-parser");
const controller = require("../controllers/registerController.js");

// Initialization
const router = Router();
const encoder = bodyParser.urlencoded();

// Requests
router.get("/", controller.getPage);
router.post("/", encoder, controller.registerUser);

module.exports = router;