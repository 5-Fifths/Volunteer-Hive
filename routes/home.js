// home.js
// Controls routing (GET, POST) for homepage endpoint

// Modules
express = require("express");

// Initialization
const router = express.Router();
const controller = require("../controllers/homeController");

// Requests
router.get("/", controller.getPage);

module.exports = router;