import jwt from "jsonwebtoken";
import User from "../models/User.js";


// middelware to protect route
export const protectRoute = async(req,resizeBy, next)=>{
    try{
        const token = req.headers.token;
        const decoded = jwt.verify(token, process.env.jwt_SEC)

        const user = await User.findById(decoded.userId).select("-password");

        if(!user) return res.json({success: false, message: "user not found"});

        req.User = user;
        next();
        
    }catch(error){
        console.log(error.message);
        res.json({success: false, message: error.message});  
    }
}