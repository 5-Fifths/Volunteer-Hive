const express = require('express');
const mysql = require('mysql2');
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();
const bcrypt = require('bcrypt');
const saltRounds = 5;

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
    var email = req.body.username;
    var password = req.body.password;
    var role = req.body.role;

    console.log("\nEmail: %s\nPassword: %s\nRole: ", email, password, role);

    bcrypt.hash(password, saltRounds, (error, hash) =>{
        if(error) {
            console.error(error);
            res.redirect("/");
            return;
        }
        console.log("\nEmail: %s\nHashed Password: %s\nRole: ", email, hash, role);
        con.query("INSERT INTO login (email, password, role_id) values (?, ?, ?)", [email, hash, role], function(error, results, fields){
            if(error) {
                console.error(error);
                res.redirect("/");
                return;
            }
            if(results.affectedRows > 0){
                res.redirect("/login");
            } else {
                res.redirect("/");
            }
            res.end();
        });
    });
});

app.get("/admin", (req, res) => {
    res.sendFile(__dirname + "/admin.html")
});

app.get("/coordinator", (req, res) => {
    res.sendFile(__dirname + "/coordinator.html")
});

app.get("/volunteer", (req, res) => {
    res.sendFile(__dirname + "/volunteer.html")
});

app.post("/login", encoder, function(req, res){
    // Retrieve username and password from the request body
    var email = req.body.username;
    var password = req.body.password;
    
    // Query the database to find a user with the provided username
    con.query("SELECT * FROM login WHERE email = ?", [email], function(error, results, fields){
        // Message to indicate that password verification is in progress
        console.log("\nVerifying password...");
        
        // If a user with the provided username is found
        if(results.length > 0){
            // Extract the hashed password for the user and check role_id
            var storedHash = results[0].password;
            var checkRole = results[0].role_id;
            
            // Compare the hashed password with the user's input password
            bcrypt.compare(password, storedHash, function(err, result) {
                // If the passwords match, check role_id then redirect to their specific page
                if(result) {
                    switch(checkRole){
                        case 1:
                            res.redirect("/admin");
                            console.log("\nEntered the admin dashboard successfully");
                            break;
                        case 2:
                            res.redirect("/coordinator");
                            console.log("\nEntered the coordinator dashboard successfully");
                            break;
                        case 3:
                            res.redirect("/volunteer");
                            console.log("\nEntered the volunteer dashboard successfully");
                            break;
                        default:
                            res.redirect("/login");
                    }
                    console.log("\nPasswords match!");
                } else {
                    // If passwords do not match, redirect to the login page "/"
                    res.redirect("/login");
                }
                // End the response
                res.end(); 
            });

        /* ---- Didn't make it past results.length check ---- */
        } else {
            // If no user with the provided username is found, redirect to the login page "/"
            res.redirect("/");
            // End the response
            res.end(); 
        }
    });
});

const port = 5500;

app.listen(port, () => {
    console.log(`\nServer running on port ${port}\n`);
});