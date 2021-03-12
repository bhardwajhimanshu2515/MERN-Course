"use strict";
const express=require("express");

//contact controoler
const contactController=require("../controllers/contact.controllers");
//import middlewatre
const checkToken=require("../middlewares/checkToken");

const router=express.Router();

router.use(checkToken);
router.post("/create",contactController.createContact);


module.exports=router;