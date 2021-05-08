const express = require('express');
const mongodb = require('mongodb'); 
const bcrypt = require('bcrypt');
const app = express();
const cors = require('cors')
const register = require('./controllers/register');
const login = require('./controllers/login')
const messages = require('./controllers/messages');


const db = {
    MongoClient: mongodb.MongoClient, 
    url:"mongodb://localhost:27017/",// URL at which MongoDB service is running
    dbName:"chatbox" // A Client to MongoDB
}

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());




app.post('/register', (req, res) => {
    
    register.handleRegister(req,res,db,bcrypt)
})

app.post('/login',(req,res)=>{
    login.handleLogin(req,res,db,bcrypt);
})


app.get('/', (req, res) => {
    res.json("This is working")
})

app.post('/messages',(req,res)=>{
    messages.saveMessage(req,res,db);
})

app.get('/messages',(req,res)=>{
    messages.getMessages(req,res,db);
})

app.listen(3001, () => {
    console.log('app is running on port 3001')
})







/*

/ --> res = this is working
/signin--> POST success/fail
/register-> POST = user
/send -> POST = message
/messages GET messages
*/