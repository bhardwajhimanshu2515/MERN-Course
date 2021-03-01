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
                response.status(201).json("User Already exists")
            }
            else if(User.length<1){
                let createdUser=NewDB.collection('user').insertOne(request.body);
                createdUser.then(User=>{
                    console.log("user=",User.ops);
                    response.status(200).json(User.ops);
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
                    res.status(200).json(User);
                }
                else{
                    res.status(201).json("Password didn't match")
                }
            }
            else{
                res.status(201).json("User Does not exist please signup");
            }
        })
   })

   //api for creating todo
   app.post("/todo",(req,res)=>{
       const {title,desc,deadline,userEmail}=req.body;
       console.log(req.body);

       //insert data in mongodb
        var createdTodo=NewDB.collection("todo").insertOne(req.body)
        createdTodo.then(Todo=>{
            console.log(Todo);
            if(Todo.ops.length>0){
                res.status(200).json(Todo.ops)
            }
            else{
                res.status(500).json("Unable to save in MongoDb");
            }
        })
   })

   //get all todo
   app.get("/getAllTodo/:email",(req,res)=>{
       const email=req.params.email;
       console.log(email);

       //query
       var allTodo=NewDB.collection("todo").find({userEmail:email}).toArray()
       allTodo.then(Todo=>{
           if(Todo.length>0){
               res.status(200).json(Todo);
           }
           else{
               res.status(500).json("Erron in getting data from mongoDB")
           }
       })
   })
});
//start server
app.listen(8081,()=>{
    console.log("server started");
})

//http://localhost:8081/getAllTask/?email="pallavi@gmail.com"
