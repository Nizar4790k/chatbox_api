const express = require('express');
const mongodb = require('mongodb'); // A Client to MongoDB
const app = express();

const MongoClient = mongodb.MongoClient;

const url = "mongodb://localhost:27017/"; // URL at which MongoDB service is running
const dbName = "chatbox";

MongoClient.connect(url, function (err, db) {

    if (err) throw err

    db.close();
});


MongoClient.connect(url, function (err, db) {

    var dbo = db.db(dbName);


    dbo.createCollection("users", function (err, res) {
        if (err) {
            if (err.code === 48) {
                console.log("Collection already exist")
            }
        } else {
            console.log("Collection created!");
        }

    });

    dbo.createCollection("chats", function (err, res) {
        if (err) {
            if (err.code === 48) {
                console.log("Collection already exist")
            }
        } else {
            console.log("Collection created!");
        }


    });

    db.close();
})



app.get('/', (req, res) => {
    res.json("This is working")
})

app.listen(3001, () => {
    console.log('app is running on port 3001')
})

app.post('/register', (req, res) => {



})





/*

/ --> res = this is working
/signin--> POST success/fail
/register-> POST = user
/send -> POST = message
/messages GET messages
*/