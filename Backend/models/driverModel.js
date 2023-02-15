const mongoose = require("mongoose");
const driverSchema= new mongoose.Schema({
    email: { type:String, required:true },
    mobile_num: { type:String, required:true },
    nic: { type:String, required:true },
    passwordHash: { type:String, required:true }
});

const Driver= mongoose.model("driver",driverSchema);

module.exports=Driver;