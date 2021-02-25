//import express
const express=require("express");
//import mongoDb
const mongoDb=require("mongodb")
//import cors
const cors=require("cors")
//import body-parser
const bodyparser=require("body-parser");

//create server
const app=express();

//app use cors and bodyparser
app.use(cors())
app.use(bodyparser.json())

//mongo URL
var mongoURL="mongodb://localhost:27017/PALLAVIdb";

//now connect to mongo db
mongoDb.MongoClient.connect(mongoURL,{useNewUrlParser:true,useUnifiedTopology:true},(err,client)=>{
    //if error ocuur on connecting to db
    if(err){
        return console.log(err);
    }
    //if not occur
    console.log("Connected to mongoDB");
    const NewDB=client.db('PALLAVIdb');

    //start creating api's from here

    //post api create->signup
    app.post("/signup",(request,response)=>{
        //get name,number,email password from request body
        const {name,phoneNumber,email,password}=request.body;
        console.log(request.body);
        
        //check if email exist or not in db
        //db.user.find //[{name:pallavi}]
        let existingUser=NewDB.collection('user').find({email:email}).toArray()
        existingUser.then(User=>{
            //user already exist
            if(User.length>0){
                response.json("User Already exists")
            }
            else if(User.length<1){
                let createdUser=NewDB.collection('user').insertOne(request.body);
                createdUser.then(User=>{
                    console.log("user=",User.ops);
                    response.json(User.ops);
                })
            }
        })
    });

    //create an api for login
    app.post("/login",(req,res)=>{
        //destructuring
        const {email,password}=req.body;
        console.log(req.body);

        //check email exist or not
        let existingUser=NewDB.collection('user').find({email:email}).toArray();
        existingUser.then(User=>{
            if(User.length>0){
                console.log(User);
                if(User[0].password===password){
                    res.json(User);
                }
                else{
                    res.json("Password didn't match")
                }
            }
            else{
                res.json("User Does not exist please signup");
            }
        })
   })
});
//start server
app.listen(8081,()=>{
    console.log("server started");
})

//http://localhost:8081/getAllTask/?email="pallavi@gmail.com"

