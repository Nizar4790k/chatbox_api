
const handleLogin = async function(req,res,database,bcrypt){

    
    const {username,password} = req.body;

    const user = {username:username,password:password}
    const {MongoClient,url,dbName}= database;
    
    

    if(!user.username || !user.password){
        return res.status(400).json("incorrect form submision");
    }

    const client =  await MongoClient.connect(url,{ useNewUrlParser: true })
                    .catch(err=>{console.log(err);});

    try{

        if(!client){
            res.status(500).json("error in the server")
            return;
            
        }

    const db = client.db(dbName);
    let collection = db.collection("users");

    let result  = await collection.findOne({username:username});

    let value = bcrypt.compareSync(user.password,result.password);

    if(value){
        res.json("ACCESS_GRANTED")
    }else{
        res.json("ACCESS_DENIED");
    }


    }catch(err){
        console.log(err)
        res.status(500).json("ERROR IN THE SERVER")
    }finally{
        client.close();
    }



}















module.exports ={
    handleLogin:handleLogin
};