const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const Customer=require('../models/Customer.models');
const Worker=require('../models/Worker.models');
const JWT_SECRET=process.env.JWT_SECRET;


// Register Customer
exports.registerCustomer=async(req,res)=>{

const {name,email,phone,password}=req.body;
try{

    if(!name || !email || !phone || !password){
        return res.status(400).json({message:"All fields are required"});
    }

    let existingCustomer=await Customer.findOne({email});
    if(existingCustomer){
        return res.status(400).json({message:"Customer with this email already exists"});
    }

    const hashedPassword=await bcrypt.hash(password,10);

    const newCustomer=new Customer({
        name,
        email,
        phone,
        password:hashedPassword
    });
    await newCustomer.save();

    res.status(201).json({message:"Customer registered successfully"}); 
}catch(error){
    console.error("Error registering customer:",error);
    res.status(500).json({message:"Server error"});
}

}

// Register Worker
exports.registerWorker=async(req,res)=>{
const {name,email,phone,password,serviceType,charges,description}=req.body;
try{    
    if(!name || !email || !phone || !password || !serviceType || !charges){
        return res.status(400).json({message:"All fields are required"});
    }

    let existingWorker=await Worker.findOne({email});
    if(existingWorker){
        return res.status(400).json({message:"Worker with this email already exists"});
    }
    const hashedPassword=await bcrypt.hash(password,10);

    const newWorker=new Worker({
        name,
        email,
        phone,
        password:hashedPassword,
        serviceType,
        charges,
        description
    });
    await newWorker.save();

    res.status(201).json({message:"Worker registered successfully"}); 
}catch(error){
    console.error("Error registering worker:",error);
    res.status(500).json({message:"Server error"});
}   
}

// Login (Customer or Worker)
exports.login=async(req,res)=>{
const {email,password}=req.body;
try{
    if(!email || !password){
        return res.status(400).json({message:"Email and password are required"});
    }

    let user=await Customer.findOne({email});
    let role="CUSTOMER";
    if(!user){
        user=await Worker.findOne({email});
        role="WORKER";
    }   
    if(!user){
        return res.status(400).json({message:"Invalid email or password"});
    }
    const isMatch=await bcrypt.compare(password,user.password);

    if(!isMatch){
        return res.status(400).json({message:"Invalid email or password"});
    }   
    //jwt sign token so when everneed to access protected route we can verify token and get user info valid up to 7 days by token the actual use is to access protected routes and verify user identity token 
    const token=jwt.sign(
        {userId:user._id,role},
        JWT_SECRET,
        {expiresIn:'7d'}
    );  
    res.status(200).json({token,role}); 
}catch(error){
    console.error("Error during login:",error);
    res.status(500).json({message:"Server error"});
}
}