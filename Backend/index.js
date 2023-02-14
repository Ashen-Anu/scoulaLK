const express= require("express");

const app=express();

const PORT= process.env.PORT || 8080;

app.listen(PORT,()=> console.log('Server Connected on port ',PORT));

app.get("/test",(req,res)=>{
    res.send("It works");
})