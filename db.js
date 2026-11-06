const mongoose =require('mongoose')
require('dotenv').config();

const mongoURL=process.env.MONGO_DB_URL   //url of mongo db

mongoose.connect(mongoURL)
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