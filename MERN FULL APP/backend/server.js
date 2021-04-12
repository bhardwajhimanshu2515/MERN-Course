const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./src/models/user");
const cors=require("cors");
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
        return res.status(500).json(err)
      }
      res.status(201).json({
        userId: createdUser.id,
        phoneNumber: createdUser.phoneNumber,
        email: createdUser.email,
        token: token,
      });
    });

    app.listen(process.env.PORT || 5000);
  })
  .catch((err) => {
    console.log(err);
  });
