
const  handleRegister = async (req,res,database,bcrypt)=>{

    
    const {username,password} = req.body;
    
    let salt = bcrypt.genSaltSync(10);
    
    hash = bcrypt.hashSync(password,salt);

    const user = {username:username,password:hash}
    
    const {MongoClient,url,dbName}= database;
    

    var isFound = false;

    if(!user.username || !user.password){
        return res.status(400).json("incorrect form submision");
    }

    const client =  await MongoClient.connect(url,{ useNewUrlParser: true })
    .catch(err=>{console.log(err);});
    
    try{

   

    if(!client){
        res.status(500).json("ERROR IN THE SERVER");
        return
    }

    const db = client.db(dbName);
    let collection = db.collection("users");
    

    isFound = await checkUser(user,collection);
    
      
    if(!isFound){

        
        let result = await insertUser(user,collection);
        if(result){
            res.json("USER_INSERTED");
        }


    }else{
        res.json("USER_EXIST");
    }

    
} catch(err){
    console.log(err)
}finally{
    client.close();
}

}

async function checkUser(user,collection){
    
    try {
    let query = {username:user.username};
    let result  = await collection.findOne(query);
    
    if(result){
        return true;
    }else{
        return false;
    }
    }catch(err){
        console.log(err);
    }

}

async function insertUser(user,collection){

    const {username,password} = user;

    try{
        user={username:username,password:password}
        let result = await collection.insertOne({username:username,password:password});
        return result;
    }
    catch(err){
        console.log(err)
    }

}




module.exports ={
    handleRegister:handleRegister
};