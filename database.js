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
    var username = req.body.username;
    var password = req.body.password;
    console.log("\nUsername: %s\nPassword: %s", username, password);
    bcrypt.hash(password, saltRounds, (error, hash) =>{
        if(error) {
            console.error(error);
            res.redirect("/");
            return;
        }
        console.log("\nUsername: %s\nHashed Password: %s", username, hash);
        con.query("INSERT INTO login (username, password) values (?, ?)", [username, hash], function(error, results, fields){
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


app.post("/login", encoder, function(req, res){
    // Retrieve username and password from the request body
    var username = req.body.username;
    var password = req.body.password;
    
    // Query the database to find a user with the provided username
    con.query("SELECT * FROM login WHERE username = ?", [username], function(error, results, fields){
        // Message to indicate that password verification is in progress
        console.log("\nVerifying password...");
        
        // If a user with the provided username is found
        if(results.length > 0){
            // Extract the hashed password for the user
            var storedHash = results[0].password;
            
            // Compare the hashed password with the user's input password
            bcrypt.compare(password, storedHash, function(err, result) {
                // If the passwords match, redirect to the "/hope" page
                if(result) {
                    res.redirect("/hope");
                    // Message to indicate that passwords match
                    console.log("\nPasswords match!");
                } else {
                    // If passwords do not match, redirect to the login page "/"
                    res.redirect("/");
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




app.get("/hope", function(req, res){
    res.sendFile(__dirname + "/hope.html")
});

app.listen(5500, () => {
    console.log('\nServer running on port 5500\n');
});