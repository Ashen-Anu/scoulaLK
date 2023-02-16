const router= require("express").Router();
const Driver= require("../models/driverModel");
const Parent= require("../models/parentModel");
const Owner= require("../models/ownerModel");
const bcyrpt= require("bcryptjs");
const jwt=require("jsonwebtoken");



//----------------------------------------------------------------Register----------------------------------------------------------------



//            ......................................Parent section......................................
router.post("/parentreg",async (req,res)=>{

    try{
        const { email, mobile_num, student_name, password }= req.body;
       
       //validation
        if(!email || !student_name || !mobile_num || !password){
            return res.status(400).json({errorMessage: "Please Enter all required fields"})//bad req- Put the error message to the front end.
        }
        if(password.length<6){
            return res.status(400).json({errorMessage:"Please Enter a password more than 6 characters"})
        }

        //To find whether there are existing records
        const existingParent= await Parent.findOne({email: email});
        
        if(existingParent){
            return res.status(400).json({errorMessage: "Parent Already Registered"})
        }
        
        //Hashing the password
        const salt= await bcyrpt.genSalt();
        const passwordHash= await bcyrpt.hash(password, salt);

        //save a new user to the system
        const newParent= new Parent({
            email, mobile_num, student_name, passwordHash
        });
        const savedParent= newParent.save();

        //sign the token
        const token= jwt.sign({
            parent: savedParent._id,
        },
        process.env.JWT_SECRET
        );
        //send the token in a cookie
        res.cookie("token",token,{
            httpOnly:true,
        })
        .send();
        
    }
       
    
    catch(err){
        console.error(err);
        res.status(500).send();
    }
});


//            ......................................Owner section......................................
router.post("/ownerreg",async (req,res)=>{

    
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
        const existingOwner= await Owner.findOne({email: email});
        if(existingOwner){
            return res.status(400).json({errorMessage: "Owner Already Registered"})
        }

        //Hashing the password
        const salt= await bcyrpt.genSalt();
        const passwordHash= await bcyrpt.hash(password, salt);

        //save a new user to the system
        const newOwner= new Owner({
            email, mobile_num, nic, passwordHash
        });

        const savedOwner= newOwner.save();

        //sign the token
        const token= jwt.sign({
            owner: savedOwner._id,
        },
        process.env.JWT_SECRET
        );
        //send the token in a cookie
        res.cookie("token",token,{
            httpOnly:true,
        })
        .send();
    }
        catch(err){
        console.error(err);
        res.status(500).send();
    }
});

//            ......................................Driver section......................................
router.post("/driverreg",async (req,res)=>{

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
        const existingDriver= await Driver.findOne({email: email});
        if(existingDriver){
            return res.status(400).json({errorMessage: "Driver Already Registered"})
        }
      
        //Hashing the password
        const salt= await bcyrpt.genSalt();
        const passwordHash= await bcyrpt.hash(password, salt);
     
        //save a new user to the system
        const newDriver= new Driver({
            email, mobile_num, nic, passwordHash
        });
        const savedDriver= newDriver.save();

        //sign the token
        const token= jwt.sign({
            driver: savedDriver._id,
        },
        process.env.JWT_SECRET
        );

        //send the token in a cookie
        res.cookie("token",token,{
            httpOnly:true,
        })
        .send();

    }
        catch(err){
        console.error(err);
        res.status(500).send();
    }
});






//----------------------------------------------------------------LOGIN----------------------------------------------------------------

//            ......................................ParentLogin section......................................

router.post("/parentlogin", async(req,res)=>{
    try{
        const { email, password }= req.body;

        //Validations
        if(!email || !password){
            return res.status(400).json({errorMessage: "Please Enter all required fields"})//bad req- Put the error message to the front end.
        }

        const existingParent = await Parent.findOne({email});

        if(!existingParent){
            return res.status(401).json({errorMessage: "Check your Email or Password"})
        }

        const parentpassCorrect= await bcyrpt.compare(password,existingParent.passwordHash);
        if(!parentpassCorrect){
            return res.status(401).json({errorMessage: "Check your Email or Password"})
        }

        //sign a token
        const token= jwt.sign({
            parent: existingParent._id,
        },
        process.env.JWT_SECRET
        );
        //send the token in a cookie
        res.cookie("token",token,{
            httpOnly:true,
        })
        .send();
    }
    catch(err){

    }
})

//            ......................................DriverLogin section......................................

router.post("/driverlogin", async(req,res)=>{
    try{
        const { email, password }= req.body;

        //Validations
        if(!email || !password){
            return res.status(400).json({errorMessage: "Please Enter all required fields"})//bad req- Put the error message to the front end.
        }

        const existingDriver = await Driver.findOne({email});

        if(!existingDriver){
            return res.status(401).json({errorMessage: "Check your Email or Password"})
        }

        const driverpassCorrect= await bcyrpt.compare(password,existingDriver.passwordHash);
        if(!driverpassCorrect){
            return res.status(401).json({errorMessage: "Check your Email or Password"})
        }

        //sign a token
        const token= jwt.sign({
            driver: existingDriver._id,
        },
        process.env.JWT_SECRET
        );
        //send the token in a cookie
        res.cookie("token",token,{
            httpOnly:true,
        })
        .send();
    }
    catch(err){

    }
})

//            ......................................OwnerLogin section......................................

router.post("/ownerlogin", async(req,res)=>{
    try{
        const { email, password }= req.body;

        //Validations
        if(!email || !password){
            return res.status(400).json({errorMessage: "Please Enter all required fields"})//bad req- Put the error message to the front end.
        }

        const existingOwner = await Owner.findOne({email});

        if(!existingOwner){
            return res.status(401).json({errorMessage: "Check your Email or Password"})
        }

        const ownerpassCorrect= await bcyrpt.compare(password,existingOwner.passwordHash);
        if(!ownerpassCorrect){
            return res.status(401).json({errorMessage: "Check your Email or Password"})
        }

        //sign a token
        const token= jwt.sign({
            owner: existingOwner._id,
        },
        process.env.JWT_SECRET
        );
        //send the token in a cookie
        res.cookie("token",token,{
            httpOnly:true,
        })
        .send();
    }
    catch(err){

    }
})


//----------------------------------------------------------------LOGOUT----------------------------------------------------------------
router.get("/logout", (req,res)=>{
    res.cookie("token","",{
        httpOnly:true,
        expires:new Date(0),
    })
    .send();
})

module.exports= router;