import mongoose from "mongoose";



const QuestionSchema=mongoose.Schema({
    questionTitle: {type:String, required:"Question must have a title"},
    questionBody: {type:String, required:"Question must have a Body"},
    questionTags: {type:[String], required:"Question must have a Tags"},
    noOfAnswers: {type:Number, default:0},
    upVote: {type:[String],default:[]},
    downVote: {type:[String],default:[]},
    userPosted: {type:String,required:"Question must have auther"},
    userId:{type:String},
    askedOn:{type:Date, default:Date.now},
    answer:[{
       answerBody:String,
       userAnswered: String,
       userId: String,
       answeredOn:{type:Date, default:Date.now},
    }]//array of object

})
export default mongoose.model("Question",QuestionSchema);