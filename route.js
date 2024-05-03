const express = require('express');

const app = express();

function sendFileHandler(req, res) {
    res.sendFile(__dirname + req.path + ".html");
}


app.get("/Register", sendFileHandler);
app.get("/Login", sendFileHandler);
app.get("/calendar", sendFileHandler);
app.get("/newEvent", sendFileHandler);
app.get("/Notification", sendFileHandler);

/* Coordinator Stuff */
app.get("/Dashboard-Coordinator", sendFileHandler);
app.get("/Event-Coordinator", sendFileHandler);
app.get("/Event-editing-Coordinator", sendFileHandler);
app.get("/SearchForEvents-Coordinator", sendFileHandler);
app.get("/ServiceHistory-Coordinator", sendFileHandler);
app.get("/Profile-Coordinator", sendFileHandler);
app.get("/Inbox-Coordinator", sendFileHandler);
app.get("/Profile-editing-Coordinator", sendFileHandler);
app.get("/Profile-Viewing-Coordinator", sendFileHandler);
app.get("/VolunteerPerformance-Coordinator", sendFileHandler);
app.get("/VolunteerProfile-Coordinator", sendFileHandler);
app.get("/VolunteerRequests-Coordinator", sendFileHandler);

/* Volunteer Stuff */
app.get("/Dashboard-Volunteer",sendFileHandler);
app.get("/Inbox-Volunteer", sendFileHandler);
app.get("/Profile-Volunteer", sendFileHandler);
app.get("/SearchForEvents-Volunteer", sendFileHandler);
app.get("/Volunteer Evaluation", sendFileHandler);
app.get("/ServiceHistory-Volunteer", sendFileHandler);
app.get("/Profile-editing-Volunteer", sendFileHandler);

/* Admin Stuff */
app.get("/Dashboard-Admin", sendFileHandler);
app.get("/Event-Admin", sendFileHandler);
app.get("/Inbox-Admin", sendFileHandler);
app.get("/ApproveViewEvents-Admin", sendFileHandler);
app.get("/AdminEval", sendFileHandler);
app.get("/VolunteerPerformance-Admin", sendFileHandler);
app.get("/VolunteerProfile-Admin", sendFileHandler);

module.exports = app;