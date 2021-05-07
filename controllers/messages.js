

async function saveMessage(req,res,database){
    
    const {username,text,date} = req.body;
    const message = {username:username,text:text,date:date}

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

        let result = await collection.insertOne({message})

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
    saveMessage:saveMessage
};