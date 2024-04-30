// database.js
// Connects to database

// Modules
mysql = require("mysql2");
require("dotenv/config");

// Prime connection
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "!Sacramento1!",
    database: "volunteer_hive"
});

// Start connection
con.connect(function(error){
    if (error) throw error
    else console.log("Connected to the database!")
});

module.exports = con;