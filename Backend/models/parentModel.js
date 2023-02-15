const mongoose = require("mongoose");
const parentSchema= new mongoose.Schema({
    email: { type:String, required:true },
    student_name: { type:String, required:true },
    mobile_num: { type:String, required:true },
    passwordHash: { type:String, required:true }
});

const Parent= mongoose.model("parent",parentSchema);

module.exports=Parent;