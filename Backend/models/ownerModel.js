const mongoose = require("mongoose");
const ownerSchema= new mongoose.Schema({
    email: { type:String, required:true },
    mobile_num: { type:String, required:true },
    nic: { type:String, required:true },
    passwordHash: { type:String, required:true }
});

const Owner= mongoose.model("owner",ownerSchema);

module.exports=Owner;