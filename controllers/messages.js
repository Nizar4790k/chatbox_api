
async function getMessages(req,res,database){
    const {MongoClient,url,dbName}= database;

    const client =  await MongoClient.connect(url,{ useNewUrlParser: true })
    .catch(err=>{console.log(err);});

    try{

        if(!client){
            res.status(500).json("Error in the server");
            return;
        }
       
        const db = client.db(dbName);
        
        let collection = db.collection("messages");

        let query = await collection.find({})

        let messages = await query.toArray();
        

        console.log(messages);
        if(messages){
            res.json(messages)
        }else{
            res.json("NO_MESSAGES");
        }

    }catch(err){
        console.log(err)
    }
}


async function saveMessage(req,res,database){
    
    const {username,text,date} = req.body;

    

    
    

    if (!username && !text && !date){
        res.status(400).json("incorrect form submision");
    }

    const {MongoClient,url,dbName}= database;

    const client =  await MongoClient.connect(url,{ useNewUrlParser: true })
    .catch(err=>{console.log(err);});

    try{

        if(!client){
            res.status(500).json("Error in the server");
            return;
        }

        const db = client.db(dbName);
        let collection = db.collection("messages");

        let result = await collection.insertOne({username:username,text:text,date:date})

        if(result){
            res.json("MESSAGE_SAVED_SUCESSFULLY");
        }else{
            res.json("MESSAGE_SAVED_FAIL");
        }
        



    }catch(err){
        res.status(500).json("Error in the server");
    }finally{
        client.close();
    }



}

module.exports ={
    saveMessage:saveMessage,
    getMessages:getMessages
};