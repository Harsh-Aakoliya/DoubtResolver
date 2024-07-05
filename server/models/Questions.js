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

// db.questions.updateMany({},{"$unset":{"questionAnalytics":1}}) this will remove questionAnalytics field from all records
// db.questions.find().forEach(function(question){
//     var vote=question.upVote;
//     for(let i=0;i<vote.length;i++){
//         delete vote[i]["timestamp"]
//     }
//     printjson(vote);
//     db.questions.updateOne(
//         { _id: question._id },
//         { $set: { upVote: vote } }
//     );
// })

// db.questions.find().forEach(function(question) {
//     var vote = question.upVote;
//     var allvoteids=[];
//     for(let i of vote){
//         var concatenatedId = "";
//         for(let j of (Object.values(i))){
//             concatenatedId+=j 
//         }
//         if(concatenatedId!="")
//         allvoteids.push(concatenatedId);
//         // printjson(concatenatedId);
//     }
//     // printjson("done");
//     // printjson(allvoteids);
//     db.questions.updateOne(
//         { _id: question._id },
//         { $set: { upVote: allvoteids } }
//     );
// });



// db.questions.find().forEach(function(question) {
//     var vote = [];
//     // printjson(question.downVote[0]?.length)
//     if(question.downVote[0]?.length>0){
//         vote.push(question.downVote[0].substring(0,24))
//     }
    
//     printjson(vote);
//     // var vote = question.downVote.substring(0,24);
//     // print(vote);
//     db.questions.updateOne(
//         { _id: question._id },
//         { $set: { downVote: vote } }
//     );
// });