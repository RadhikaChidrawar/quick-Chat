// import { use } from "react";
import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from 'bcryptjs'
import cloudinary from "../lib/cloudinary.js";
 
//  sing up new user
export const singup = async (req,res)=>{
    const {fullName, email, password, bio} = req.body;

    try{
        if(!fullName || !email || !password || !bio){
            return res.json({success : false , message: "Missing Deatils"})
        }
        const user = await User.findOne({email});
        if(user){
            return res.json({success:false, message:"Account alredy exists"})
        }
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            fullName, email, password:hashpassword, bio
        });
        const token = generateToken(newUser._id)

        res.json({success: true, useData:newUser, token, message: "Account Created successfully....!"})

    }catch (error){
        console.log(error.message); 
        res.json({success: false,  message:error.message})
    }
}


// controller to login user
export const login = async(req, res)=>{
    try{
        const{email, password} = req.body
        const useData = await User.findOne({email});

        const isPasswordCorrect = await bcrypt.compare(password, useData.password)

        if(!isPasswordCorrect){
            return res.json({success: false, message: "Invalid credentials"})
        } 
        const token = generateToken(useData._id)

        res.json({success: true, useData, token, message: "Login successfully....!"})

    }catch(error){
        console.log(error.message); 
        res.json({success: false,  message:error.message})
    }
}

// controller to check if user is authenticated
export const checkAuth =(req, res)=>{
    res.json({success: true , user:req.user})
}


// controller to updated user profile details 
export const updatedProfile = async(req, res)=>{
    try{
        const {profilePic, bio, fullName}= req.body;
        const userId = req.user._id
        let updatedUser;

        if(!profilePic){
           updatedUser = await User.findByIdAndUpdate(userId,{bio, fullName}, {new:true})
        }else{
            const uplode = await cloudinary.uploader.upload(profilePic);
            updatedUser = await User.findByIdAndUpdate(userId,{profilePic: uplode.secure_url, bio, fullName}, {new: true} )
        }
        res.json({
            success:true,
            User: updatedUser
        })
    }catch(error){
        res.json({
            success:false,
            message: error.message
        })
    }
}