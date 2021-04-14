const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./src/models/user");
const Todo = require("./src/models/todo");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(bodyParser.json());

var dburl = "mongodb://127.0.0.1:27017/reduxdb";

mongoose
  .connect(dburl, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Server has started.......");

    //signup api
    app.post("/signup", async (req, res) => {
      const { name, phoneNumber, email, password } = req.body;
      // checking if user already exists
      let existingUser;
      try {
        existingUser = await User.findOne({ email: email });
      } catch (err) {
        return res.status(500).json(err);
      }

      if (existingUser) {
        return res.status(422).json(err);
      }

      //creating a hashed password and saving the user into mongo.
      let hashedPassword;
      try {
        hashedPassword = await bycrypt.hash(password, 12);
      } catch (err) {
        return res.status(500).json(err);
      }
      const createdUser = new User({
        name,
        phoneNumber,
        email,
        password: hashedPassword,
      });
      try {
        await createdUser.save();
      } catch (err) {
        return res.status(500).json(err);
      }

      //generating JWT TOKEN- DO NOT TOUCH
      let token;
      try {
        token = jwt.sign(
          {
            userId: createdUser.id,
            email: createdUser.email,
            userType: createdUser.userType,
          },
          "my toKen",
          { expiresIn: "1h" }
        );
      } catch (err) {
        return res.status(500).json(err);
      }
      res.status(201).json({
        userId: createdUser.id,
        phoneNumber: createdUser.phoneNumber,
        email: createdUser.email,
        token: token,
      });
    });

    //login api here
    app.post("/login",async(req,res)=>{
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
            isValidPassword=await bycrypt.compare(password,existingUser.password);
        }
        catch(err){
          console.log(err)
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
    })
    //todo create api
    app.post("/todoCreate", async (req, res) => {
      const { title, description,deadline, ownerId } = req.body;
      console.log(req.body);
      const createdTodo = new Todo({
        title,
        description,
        deadline,
        ownerId,
      });
      try {
        await createdTodo.save();
      } catch (err) {
        return res.status(500).json("error in saving todo");
      }
      return res.status(201).json(createdTodo);
    });

    //get all todo api
    app.get("/getAllTodo/:ownerId",async(req,res)=>{
      const ownerId=req.params.ownerId;
      let allTodo;
      try{
        allTodo=await Todo.find({ownerId:ownerId})
      }
      catch(err){
        console.log(err)
        return res.status(500).json("Error in getting all Todo")
      }

      return res.status(200).json(allTodo);
    })
    app.listen(process.env.PORT || 5000);
  })
  .catch((err) => {
    console.log(err);
  });
