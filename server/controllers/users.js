import mongoose from "mongoose";
import User from "../models/auth.js"


import * as cloudinary from "cloudinary";
// const cloudinary = require("cloudinary").v2;
// require('dotenv').config();
import dotenv from "dotenv"
dotenv.config()
// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: 'harsh20', 
  api_key: '928415312629719', 
  api_secret: 'kw5TYWvqY2bY9lt69LMUvJVHnBU' 
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
    // console.log("Here in updateProfile ")
    const {id:_id}=req.params;
    const {name,about,tags,previewSource} =req.body;//all the name must be sams as req
    // console.log("body at server after clicking save profile ",req.body);
    
    
    // const {cloudinary}=require('../utils/cloudinary.js')//do this if we frequently require the cloudinary 
    //uploading to cloudinary
    let uploadedResponse={};
    try{

        uploadedResponse = await cloudinary.uploader.upload(previewSource)
        // console.log("this is uploaded response",uploadedResponse);  
    }
    catch(error){
        console.log("This is the error while uploading profile photo",error);
    }
    

    
    // given id is valid or not
    // try{

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send("profile with this id is not avilable");
    }

    // }
    // catch(error){
    //     return res.status(404).json({message:error.message});
    // }
    try {
        // console.log("trying to updatad user profile");
        // console.log(uploadedResponse.url);
        const updatedProfile=await User.findByIdAndUpdate(_id, {$set: {"name":name, "about":about,"tags":tags,"profilePhoto":uploadedResponse.url}},{new:true}); //now new:true means if we don't give new:true it will update profile to database but it will return old profile with out updated but here new:true so it will return profile after updating
        // console.log(updatedProfile);

        res.status(200).json(updatedProfile);

    } catch (error) {
        console.log(error);
        res.status(404).json({message:error.message});
    }
}