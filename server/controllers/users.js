import mongoose from "mongoose";
import User from "../models/auth.js"


import * as cloudinary from "cloudinary";
// const cloudinary = require("cloudinary").v2;
// require('dotenv').config();
import dotenv from "dotenv"
dotenv.config()
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const getAllUsers=async(req,res)=>{
    try {
        const allUsers=await User.find();//we have retrived all the existing Users
        const allUserDetails=[];
        allUsers.forEach(users => {
            allUserDetails.push({ _id:users._id , name:users.name ,email:users.email, about:users.about , tags:users.tags , joinedOn:users.joinedOn,profilePhoto:users.profilePhoto})
        });
        res.status(200).json(allUserDetails);//returning array to frontend
    } catch (error) {
        res.status(404).json({ message:error.message });
    }
}

//for updating profile
export const updateProfile = async(req,res) =>{
    const {id:_id}=req.params;
    const {name,about,tags,previewSource} =req.body;//all the name must be sams as req
    console.log("a;sldkfj",req.body);
    
    
    // const {cloudinary}=require('../utils/cloudinary.js')//do this if we frequently require the cloudinary 
    //uploading to cloudinary
        
    const uploadedResponse = await cloudinary.uploader.upload(previewSource)
    console.log(uploadedResponse);  
    

    
    //given id is valid or not
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send("profile with this id is not avilable");
    }
    try {
        const updatedProfile=await User.findByIdAndUpdate(_id, {$set: {"name":name, "about":about,"tags":tags,"profilePhoto":uploadedResponse.url}},{new:true}); //now new:true means if we don't give new:true it will update profile to database but it will return old profile with out updated but here new:true so it will return profile after updating


        res.status(200).json(updatedProfile);

    } catch (error) {
        res.status(404).json({message:error.message});
    }
}