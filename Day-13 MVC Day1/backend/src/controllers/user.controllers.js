"use strict"
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

//import userSchema
const User=require("../models/user");

//signup
const signup=async(req,res)=>{
    const {name,phoneNumber,email,password}=req.body;
        console.log(req.body);

        //user exist or not
        let existingUser;
        try{
            existingUser=await User.findOne({email:email})
        }
        catch(err){
            return res.status(500).json("Error in checking existing user");
        }

        //if user exists
        if(existingUser){
            return res.status(422).json("User Already Exist");
        }

        //user does not exist -> convert password into hash
        let hashedPassword;
        try{
            hashedPassword= await bcrypt.hash(password,12);
        }
        catch(err){
            return res.status(500).json("Error in hashing");
        }

        //now save in db
        let createdUser=new User({
            name,
            phoneNumber,
            email,
            password:hashedPassword
        });
        try{
            await createdUser.save()
        }
        catch(err){
            res.status(500).json("Error in saving user");
        }

        //token generate
        let token;
        try{
            token=jwt.sign(
                {userId:createdUser.id,email:createdUser.email},
                "myToken123456789",
                {expiresIn:'21d'}
            )
        }
        catch(err){
            return res.status(500).json("Error in token generation");
        }

        //response
        res.status(201).json({
            userId:createdUser.id,
            name:createdUser.name,
            phoneNumber:createdUser.phoneNumber,
            email:createdUser.email,
            token:token
        });
};

//login
const login=async(req,res)=>{
    const {email,password}=req.body;
        console.log(req.body);

        //find out user exist or not
        let existingUser;
        try{
            existingUser=await User.findOne({email:email});
        }
        catch(err){
            return res.status(500).json("Error in checking user");
        }

        if(!existingUser){
            return res.status(500).json("user does not exist please signup");
        }

        //password valid h ya nhi
        let isValidPassword;
        try{
            isValidPassword=await bcrypt.compare(password,existingUser.password);
        }
        catch(err){
            return res.status(500).json("Error in checking password");
        }

        //if not valid password
        if(!isValidPassword){
            return res.status(401).json("User's password doesnt match");
        }

        //token generate kero
        let token;
        try{
            token=jwt.sign(
                {userId:existingUser.id,email:existingUser.email},
                "myToken123456789",
                {expiresIn:'21d'}
            )
        }
        catch(err){
            return res.status(500).json("Error in token generation");
        }

        //return response
        res.status(201).json({
            userId:existingUser.id,
            name:existingUser.name,
            phoneNumber:existingUser.phoneNumber,
            email:existingUser.email,
            token:token
        });
};

exports.signup=signup;
exports.login=login;