"use strict"
const Contact=require("../models/contact");

//create a function to create contact
const createContact=async(req,res)=>{
    const {name,phoneNumber,ownerId}=req.body;
    console.log(req.body);
    const createdContact=new Contact({
        name,
        phoneNumber,
        ownerId
    });
    try{
        await createdContact.save();
    }
    catch(err){
        return res.status(500).json("error in saving contact");
    }
    return res.status(201).json(createdContact);
}

exports.createContact=createContact;