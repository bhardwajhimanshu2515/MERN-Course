const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

//import userSchema
const User=require("./src/models/user");

//create server
const app = express();

//app use
app.use(bodyParser.json());
app.use(cors());

//db url
var dbURL = "mongodb://127.0.0.1:27017/friendDB";
mongoose
  .connect(dbURL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Connected to mongodb");

    //create signup api here
    app.post("/api/user/signup",async (req,res)=>{
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

    })

    //server start
    app.listen(8081, () => {
      console.log("Server started");
    });
  });
