const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const saltRounds = 10;

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

function handleRegister(req, res){
    var fname = req.body.fname;
    var lname = req.body.lname;
    var email = req.body.username;
    var password = req.body.password;
    var role = req.body.role;

    console.log("\n----- INFORMATION ENTERED -----\n\nFirst Name: %s\nLast Name: %s\nEmail: %s\nPassword: %s\nRole: ", fname, lname, email, password, role);
    console.log("\n-------------------------------\n")

    bcrypt.hash(password, saltRounds, (error, hash) =>{
        if(error) {
            console.error(error);
            res.redirect("/");
            return;
        }
        console.log("\n----- PASSWORD AFTER HASHING PROCESS -----\n\nHashed Password: %s", hash);
        console.log("\n------------------------------------------\n")
        con.query("INSERT INTO login (fname, lname, username, password, acc_type) values (?, ?, ?, ?, ?)", [fname, lname, email, hash, role], function(error, results, fields){
            if(error) {
                console.error(error);
                res.redirect("/Register");
                return;
            }
            if(results.affectedRows > 0){
                res.redirect("/Login");
            } else {
                res.redirect("/Register");
            }
            res.end();
        });
    });
}

function handleLogin(req, res){
    var email = req.body.username;
    var password = req.body.password;
    
    console.log("\n----- ATTEMPTING LOGIN -----");

    con.query("SELECT * FROM login WHERE username = ?", [email], function(error, results, fields){
        console.log("\nVerifying password...");
        if(results.length > 0){
            var storedHash = results[0].password;
            var checkRole = results[0].acc_type;
            
            bcrypt.compare(password, storedHash, function(err, result) {
                if(result) {
                    switch(checkRole){
                        case 1:
                            res.redirect("/Dashboard-Admin");
                            console.log("\nPasswords match!");
                            console.log("\nEntered the admin dashboard successfully");
                            console.log("\n----------------------------\n");
                            break;
                        case 2:
                            res.redirect("/Dashboard-Coordinator");
                            console.log("\nPasswords match!");
                            console.log("\nEntered the coordinator dashboard successfully");
                            console.log("\n----------------------------\n");
                            break;
                        case 3:
                            res.redirect("/Dashboard-Volunteer");
                            console.log("\nPasswords match!");
                            console.log("\nEntered the volunteer dashboard successfully");
                            console.log("\n----------------------------\n");
                            break;
                        default:
                            res.redirect("/Login");
                    }
                } else {
                    console.log("\nPasswords don't match. Please try again!")
                    console.log("\n----------------------------\n");
                    res.redirect("/Login");
                }
                res.end(); 
            });

        } else {
            res.redirect("/Register");
            res.end(); 
        }
    });
}

function handleProfileEdit(req, res){
    var education = req.body.education;
    var major = req.body.major;
    var aboutMe = req.body.aboutMe;
    var skill = req.body.skill;
    
    con.query("INSERT INTO profile (education, major, about_me, skills) VALUES(?, ?, ?, ?)", [education, major, aboutMe, skill], function(error, results, fields){
        if(error) {
            console.error(error);
            res.redirect("/Dashboard-Volunteer");
            return;
        }
        if(results.affectedRows > 0){
            res.redirect("/Profile-Volunteer");
        }
    });
}


module.exports = { handleRegister, handleLogin, handleProfileEdit };
