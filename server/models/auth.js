//this file defines the database schema of out authentication

import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    about:{type:String},
    tags:{type:[String]},//array of string
    joinedOn:{type:Date , default:Date.now}, //when user is created then at that time joinedOn will store
    profilePhoto : String
});
//12) now after creating schema for user now we can use it into auth.js of controllers folder so now go there

export default mongoose.model("User",userSchema); //we have given this model name as User

