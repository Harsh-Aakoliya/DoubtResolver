import mongoose from "mongoose";
import User from "../models/auth.js"


export const getAllUsers=async(req,res)=>{
    try {
        const allUsers=await User.find();//we have retrived all the existing Users
        const allUserDetails=[];
        allUsers.forEach(users => {
            allUserDetails.push({ _id:users._id , name:users.name , about:users.about , tags:users.tags , joinedOn:users.joinedOn})
        });
        res.status(200).json(allUserDetails);//returning array to frontend
    } catch (error) {
        res.status(404).json({ message:error.message });
    }
}

//for updating profile
export const updateProfile = async(req,res) =>{
    const {id:_id}=req.params;
    const {name,about,tags} =req.body;
    //given id is valid or not
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send("profile with this id is not avilable");
    }

    try {
        const updatedProfile=await User.findByIdAndUpdate(_id, {$set: {"name":name, "about":about,"tags":tags}},{new:true}); //now new:true means if we don't give new:true it will update profile to database but it will return old profile with out updated but here new:true so it will return profile after updating

        res.status(200).json(updatedProfile);

    } catch (error) {
        res.status(404).json({message:error.message});
    }
}