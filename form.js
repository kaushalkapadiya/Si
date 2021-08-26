var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');

var dbConn = mongodb.MongoClient.connect('mongodb://localhost:27017');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, 'public')));

app.post('/formpost', function (req, res) {
    dbConn.then(function(db) {
        delete req.body._id; // for safety reasons

        db.collection('feedbacks').insertOne(req.body);
    });
    res.send('Data received:\n' +'<br>First name: '+ JSON.stringify(req.body.fname)+'<br>Last name: '+ JSON.stringify(req.body.lname)+'<br>Email: '+ JSON.stringify(req.body.email)+'<br>Subject: '+ JSON.stringify(req.body.subject)+'<br>Message: '+ JSON.stringify(req.body.Message));
});

app.get('/next',  function(req, res) {
    dbConn.then(function(db) {
        db.collection('feedbacks').find({}).toArray().then(function(feedbacks) {
            res.status(200).json(feedbacks);
        });
    });
});

app.listen(3000,()=>{console.log("on port 3000");});
