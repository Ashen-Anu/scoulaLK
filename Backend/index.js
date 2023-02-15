const express= require("express");
const mongoose = require("mongoose");
const dotenv= require("dotenv");

dotenv.config();

const app=express();

const PORT= process.env.PORT || 8080;

app.listen(PORT,()=> console.log('Server Connected on port ',PORT));

app.use(express.json());

app.get("/test",(req,res)=>{
    res.send("It works");
})


//connect to mongoDB
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MDB_CONNECT, (err)=>{
    if(err) return console.error(err);
    console.log("connected to MongoDB");
    
});

//set up routes

app.use("/auth", require("./routers/usersRouter"));