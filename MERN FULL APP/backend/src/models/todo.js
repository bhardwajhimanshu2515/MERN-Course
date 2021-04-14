const mongoose=require("mongoose");

const Schema=mongoose.Schema;

//create schema for todo
const todoSchema=new Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    deadline:{type:String,required:true},
    ownerId:{type:Schema.Types.ObjectId,ref:"User"}
});

module.exports=mongoose.model('Todo',todoSchema);