// app.js
// Driver code

// Modules
express = require("express");
require("dotenv/config");

// Local modules
registerRoute = require("./routes/register.js");
loginRoute = require("./routes/login.js");
homeRoute = require("./routes/home.js");

// Initialization
const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(express.json());
app.use(express.static("webpage"));

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