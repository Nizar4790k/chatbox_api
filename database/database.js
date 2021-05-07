const initDatabase = (database) => {

    const { MongoClient, url, dbName } = database;

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

}

module.exports ={
    initDatabase:initDatabase
};