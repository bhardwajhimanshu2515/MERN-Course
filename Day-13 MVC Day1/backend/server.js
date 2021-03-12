const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

//import route
const userRoute=require("./src/routes/user.routes");
const contactRoute=require("./src/routes/contact.routes");

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

    //user api
    app.use("/api/user",userRoute);
    app.use("/api/contact",contactRoute);

    //server start
    app.listen(8081, () => {
      console.log("Server started");
    });
  });
