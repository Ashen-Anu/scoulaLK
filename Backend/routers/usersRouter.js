const router= require("express").Router();
const Driver= require("../models/driverModel");
const Parent= require("../models/parentModel");
const Owner= require("../models/ownerModel");
router.post("/",async (req,res)=>{

    try{
        const { email, mobile_num, nic, password }= req.body;
        //validation

        if(!email || !mobile_num || !nic || !password){
            return res.status(400).json({errorMessage: "Please Enter all required fields"})//bad req- Put the error message to the front end.
        }
        if(password.length<6){
            return res.status(400).json({errorMessage:"Please Enter a password more than 6 characters"})
        }

        //To find whether there are existing records

        const existingParent= await Parent.findOne({email: email});
        const existingDriver= await Driver.findOne({email: email});
        const existingOwner= await Owner.findOne({email: email});
        
        if(existingParent){
            return res.status(400).json({errorMessage: "Parent Already Registered"})
        }
        if(existingDriver){
            return res.status(400).json({errorMessage: "Driver Already Registered"})
        }
        if(existingOwner){
            return res.status(400).json({errorMessage: "Owner Already Registered"})
        }
    }
        catch(err){
        console.error(err);
        res.status(500).send();
    }
});

module.exports= router;