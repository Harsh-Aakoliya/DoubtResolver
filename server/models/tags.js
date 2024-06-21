import mongoose from "mongoose";

const tagSchema=mongoose.Schema({
    tagTitle: {type:String},
    tagDescription: {type:String},
    createdOn:{type:Date , default:Date.now},
    allQuestions:{type:[String],default:[]}
});

export default mongoose.model("Tags",tagSchema); 