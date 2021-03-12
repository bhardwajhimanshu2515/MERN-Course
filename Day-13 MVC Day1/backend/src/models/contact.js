const mongoose=require("mongoose");

const Schema=mongoose.Schema;

//create schema for Contact
const contactSchema=new Schema({
    name:{type:String,required:true},
    phoneNumber:{type:String,required:true},
    ownerId:{type:Schema.Types.ObjectId,ref:"User"}
});

module.exports=mongoose.model('Contact',contactSchema);