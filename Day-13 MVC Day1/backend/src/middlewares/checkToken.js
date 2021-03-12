const jwt=require("jsonwebtoken");

module.exports=(req,res,next)=>{
    if(req.method==="OPTIONS"){
        return next();
    }
    try{
        const token=req.headers.authorization.split(" ")[1] //Authorization: 'Bearer Token'
        if(!token){
            return res.json("Auth Failed");
        }
        const decodedToken=jwt.verify(token,"myToken123456789");
        req.userData={userId:decodedToken.userId};
        next();
    }
    catch(err){
        res.status(403).json("Authentication Failed");
    }

}