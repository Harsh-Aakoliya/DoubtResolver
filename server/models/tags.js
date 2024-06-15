import mongoose from "mongoose";

const tagSchema=mongoose.Schema({
    tagTitle: {type:String},
    tagDescription: {type:String,default:"Newly added tag Description is under process"},
    createdOn:{type:Date , default:Date.now},
});

export default mongoose.model("Tags",tagSchema); 