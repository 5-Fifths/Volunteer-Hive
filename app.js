// app.js
// Driver code

// Modules
const express = require("express");
const genuuid = require("uuidv4");
const session = require("express-session");
require("dotenv/config");

// Local modules
const registerRoute = require("./routes/register.js");
const loginRoute = require("./routes/login.js");
const homeRoute = require("./routes/home.js");

// Initialization
const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(express.json()); // Format of messages
app.use(express.static("webpage")); // Directory for CSS files and images
app.use(session({ // Create unique user session
    name: "sessionCookie",
    genid: (req) => {
        return genuuid();
    },
    secret: "peepeepoopoo", // If we ever deploy, generate this secret on rotating basis; used to create session hash
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, 
        expires: 60000
    }
}));

// Routing
app.use("/register", registerRoute);
app.use("/login", loginRoute);
app.use("/", homeRoute);

// Listen to port for db
app.listen(PORT, (error) => {
    if (error) {
        console.error(error);
        return;
    }

    console.log("\nServer running on port %d\n", PORT);
});