const express = require('express');
const mysql = require('mysql2');
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();

const app = express();

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "!Sacramento1!",
    database: "volunteer_hive"
});

con.connect(function(error){
    if (error) throw error
    else console.log("Connected to the database!")
});

app.get("/register", function(req, res){
    res.sendFile(__dirname + "/register.html");

});

app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/login.html")
});

app.post("/register", encoder, function(req, res){
    var username = req.body.username;
    var password = req.body.password;
    con.query("INSERT INTO login (username, password) values (?, ?)", [username, password], function(error, results, fields){
        if(results.affectedRows > 0){
            res.redirect("/login");
        } else {
            res.redirect("/");
        }
        res.end();
    });
});

app.post("/login", encoder, function(req, res){
    var username = req.body.username;
    var password = req.body.password;
    con.query("SELECT * FROM login WHERE username = ? AND password = ?", [username, password], function(error, results, fields){
        if(results.length > 0){
            res.redirect("/hope");
        } else {
            res.redirect("/");
        }
        res.end();
    });
});

app.get("/hope", function(req, res){
    res.sendFile(__dirname + "/hope.html")
});

app.listen(5500, () => {
    console.log('\nServer running on port 5500\n');
});