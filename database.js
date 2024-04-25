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

app.get("/", function(req, res){
    res.sendFile(__dirname + "/register.html");

});

app.post("/", encoder, function(req, res){
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

app.get("/", function(req, res){
    res.sendFile(__dirname + "/login.html");

});

app.post("/", encoder, function(req, res){
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

app.listen(5502, () => {
    console.log('\nServer running on port 5502\n');
});



/* --------------------------------------------------------- */



// const mysql = require('mysql2/promise');

// /* ----- INSERTING DATA ----- */

// async function insertData() {
//     const pool = await mysql.createPool({
//         host: 'localhost',
//         user: 'root',
//         password: '!Sacramento1!',
//         database: 'volunteer_hive'
//     });

//     try {
//         const [rows, fields] = await pool.execute(
//             'INSERT INTO login (username, password) VALUES (?, ?)',
//             ['daniel23', 'pass12']
//         );
//         console.log('Inserted row:', rows);
//     } catch (error) {
//         console.error(error);
//     } finally {
//         pool.end();
//     }
// }

// insertData();

// /* ----- VIEWING DATA ----- */

// async function main() {
//     const pool = await mysql.createPool({
//         host: 'localhost',
//         user: 'root',
//         password: '!Sacramento1!',
//         database: 'volunteer_hive'
//     });

//     try {
//         const [rows, fields] = await pool.query("SELECT * FROM login");
//         console.log(rows);
//     } catch (error) {
//         console.error(error);
//     } finally {
//         pool.end();
//     }
// }

// main();