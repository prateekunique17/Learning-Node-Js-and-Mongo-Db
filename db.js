const mongoose =require('mongoose')

const monngoURL='mongodb://localhost:27017/hotels'   //url of mongo db
mongoose.connect(monngoURL)

const db = mongoose.connection;

db.on('connected',()=>{              //messages of connections
    console.log("Mongo Db connected ")
});
db.on('error',(err)=>{
    console.log("Mongo Db connection error ",err)
});
db.on('disconnected',()=>{
    console.log("Mongo Db connected ")
});

module.exports = db;   //exporting the Database