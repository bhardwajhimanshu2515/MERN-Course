const express=require("express");

//controller 
const userController=require("../controllers/user.controllers");

//router create
const router=express.Router();

router.post("/signup",userController.signup);
router.post("/login",userController.login);

module.exports=router;