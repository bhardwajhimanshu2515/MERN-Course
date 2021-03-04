const mongoose=require("mongoose");
const uniqueValidator=require("mongoose-unique-validator");

const Schema=mongoose.Schema;

//create schema for User
const userSchema=new Schema({
    name:{type:String,required:true},
    phoneNumber:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    isActive:{type:Boolean,default:true}
});

userSchema.plugin(uniqueValidator);

module.exports=mongoose.model('User',userSchema);


