const express=require("express");
const cors=require("cors");
const bodyParser=require("body-parser")
const app=express();

app.use(cors());
app.use(bodyParser.json())

app.post("/hit",(req,res)=>{
    const {url,method,body}=req;
    console.log(url,method,body);
    res.send("hello");
})

app.listen(8081,()=>{
    console.log("server started");
})