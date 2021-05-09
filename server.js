const express = require('express');
const mongodb = require('mongodb'); 
const bcrypt = require('bcrypt');
const app = express();
const server = require('http').createServer(app)
const cors = require('cors')
const register = require('./controllers/register');
const login = require('./controllers/login')
const messages = require('./controllers/messages');
const { text } = require('express');


app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

const io = require('socket.io')(server,{
    cors: {
    origin:'*'
  }})




server.listen(3001,()=>{
    console.log(`Server running on port: 3001`)
})




const db = {
    MongoClient: mongodb.MongoClient, 
    url:"mongodb://localhost:27017/",// URL at which MongoDB service is running
    dbName:"chatbox" // A Client to MongoDB
}





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

//App setup
 




io.on('connection', (socket) => {
   
    socket.on('message',async (msg) =>{
    
        const {username,text,date} = msg;

    const {MongoClient,url,dbName}= db;

    const client =  await MongoClient.connect(url,{ useNewUrlParser: true })
    .catch(err=>{console.log(err);});

    if(!client){
        res.status(500).json("Error in the server");
        return;
    }
   
    const dbo = client.db(dbName);
    
    let collection = dbo.collection("messages");

    let result = await collection.insertOne({username:username,text:text,date:date})

    let query = await collection.find({})

    let messages = await query.toArray();


    socket.broadcast.emit('push',messages)
    })




});




/*

/ --> res = this is working
/signin--> POST success/fail
/register-> POST = user
/send -> POST = message
/messages GET messages
*/