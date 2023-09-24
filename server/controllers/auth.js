//this file is for to handle function when various request for authentication is called

// 12) before creating function of signup and login we need schema for both so it will be handeled by models folder so we need to goto auth.js file of models

// 14) now we can user schema of user from models folder and another needed packages
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import users from "../models/auth.js"

export const signup =async(req,res)=>{
    // 15) now we are getting request from "/user/signup" now to get field of username , email and password we need three variables
    const {name,email,password}=req.body;//after this we got name, email and password field from signin page
    try{
        //here we are sending request to atlas for finding only one user using email using schema users which we have imported form models folder so we have to use below await function  
        const existinguser=await users.findOne({email});
        
        if(existinguser){
            return res.status(404).json({message:"User already exist..."});//if user already exist then return message
        }
        
        //hashing the password
        const hashedPassword= await bcrypt.hash(password,12);//12 is salt value 
        const newUser=await users.create({name,email,password:hashedPassword});//inserting newuser into users database of atlas and geting it into newUser variable
        const token=jwt.sign({email:newUser.email , id:newUser._id},"test",{expiresIn:"1h"})//generating token for authentication . here "test" is highly confidential things
        res.status(200).json({result:newUser,token});
        
    }
    catch(error){
        req.status(500).json("Something went wrong");
        // console.log("notdone yet");
    }
    
}

export const login =async(req,res)=>{
    const {email,password}=req.body;//after this we got email and password field form login page
    try{
        //since we are logining so if we found that user then and only then we need to allow.
        const existinguser=await users.findOne({email});
        
        if(!existinguser){
            return res.status(404).json({message:"User dosen't exist..."});//if user not exist then return message
        }
        
        const isPasswordCrt=await bcrypt.compare(password,existinguser.password);
        
        if(!isPasswordCrt){
            return res.status(400).json({message:"Invalid credentials Password not match"});
        }

        const token=jwt.sign({email:existinguser.email , id:existinguser._id},"test",{expiresIn:"1h"})//generating token for authentication . here "test" is highly confidential things
        res.status(200).json({result:existinguser,token}); 
    }   
    catch(error){
        req.status(500).json("Something went wrong");
        // console.log("notdone yet");
    }
    //16) now we have done with backend of authentication so for redux we need to go to client folder and create folders like actions and reducers and goto index.js file of client
}
