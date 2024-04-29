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
    var email = req.body.username;
    var password = req.body.password;
    var role = req.body.role;

    console.log("\n----- INFORMATION ENTERED -----\n\nEmail: %s\nPassword: %s\nRole: ", email, password, role);
    console.log("\n-------------------------------\n")

    bcrypt.hash(password, saltRounds, (error, hash) =>{
        if(error) {
            console.error(error);
            res.redirect("/");
            return;
        }
        console.log("\n----- PASSWORD AFTER HASHING PROCESS -----\n\nHashed Password: %s", hash);
        console.log("\n------------------------------------------\n")
        con.query("INSERT INTO login (email, password, role_id) values (?, ?, ?)", [email, hash, role], function(error, results, fields){
            if(error) {
                console.error(error);
                res.redirect("/register");
                return;
            }
            if(results.affectedRows > 0){
                res.redirect("/login");
            } else {
                res.redirect("/register");
            }
            res.end();
        });
    });
}

function handleLogin(req, res){
    var email = req.body.username;
    var password = req.body.password;
    
    console.log("\n----- ATTEMPTING LOGIN -----");

    con.query("SELECT * FROM login WHERE email = ?", [email], function(error, results, fields){
        console.log("\nVerifying password...");
        if(results.length > 0){
            var storedHash = results[0].password;
            var checkRole = results[0].role_id;
            
            bcrypt.compare(password, storedHash, function(err, result) {
                if(result) {
                    switch(checkRole){
                        case 1:
                            res.redirect("/admin");
                            console.log("\nPasswords match!");
                            console.log("\nEntered the admin dashboard successfully");
                            console.log("\n----------------------------\n");
                            break;
                        case 2:
                            res.redirect("/coordinator");
                            console.log("\nPasswords match!");
                            console.log("\nEntered the coordinator dashboard successfully");
                            console.log("\n----------------------------\n");
                            break;
                        case 3:
                            res.redirect("/volunteer");
                            console.log("\nPasswords match!");
                            console.log("\nEntered the volunteer dashboard successfully");
                            console.log("\n----------------------------\n");
                            break;
                        default:
                            res.redirect("/login");
                    }
                } else {
                    console.log("\nPasswords don't match. Please try again!")
                    console.log("\n----------------------------\n");
                    res.redirect("/login");
                }
                res.end(); 
            });

        } else {
            res.redirect("/register");
            res.end(); 
        }
    });
}

module.exports = { handleRegister, handleLogin };