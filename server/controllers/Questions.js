
import Questions from "../models/Questions.js"
import mongoose from "mongoose"



//this will store asked question to mongodb data base
export const AskQuestion = async (req,res) =>{
    const postQuestionData=req.body;  //title,body and tags reterived from front end
    // console.log(req.body.questionList);
    const postQuestion=new Questions(postQuestionData); //now creating new object with Schema as Questions (which we have imported from model) with data as postQuesitonData
    try{
        await postQuestion.save(); //saving to moongoDB
        res.status(200).json("Posted a question successfully");
    }
    catch(error){
        console.log(error);
        res.status(409).json("could not post new question");
    }
            
}

//thsi will return all the existing question to frontend

export const getAllQuestions=async (req,res)=>{

    try {
        const questionList=await Questions.find();//it will store all the questions from Question schema from database to questionList variable
        // console.log(questionList);
        res.status(200).json(questionList); //sending data to frontend
    } catch (error) {
        res.status(404).json({message : error.message});
    }
}


//for deleting question 
export const deleteQuestion=async (req,res)=>{
    const {id:_id} = req.params; //extracting id from url from where we are requesting this functionallity

    //now moongoDB have function to check weather given id is valid or not if id is not valid then question will also not avilable so we just checking it
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send("Question is not avilable");
    }

    try {
        await Questions.findByIdAndRemove(_id);//moongodb function to remove record for that we need _id as parameter
        res.status(200).json({message : "Question Deleted successfully"});
    } catch (error) {
        res.status(404).json({message : error.message});//404 is for question not found

    }
}


export const voteQuestion=async(req,res)=>{
    const { id:_id } = req.params;
    const { value,userId }=req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send("Question is not avilable");
    }

    try {
        const question=await Questions.findById(_id); //so now this question is one object like {"_id":{"$oid":"65016e4aa3db6c94c0984a35"},"questionTitle":"asdf","questionBody":"asdf","questionTags":["asdf"],"noOfAnswers":{"$numberInt":"2"},"upVote":[],"downVote":[],"userPosted":"harsh","userId":"64eb9495773b76678bff517f","askedOn":{"$date":{"$numberLong":"1694592586988"}},"answer":[{"answerBody":"sdfasd","userAnswered":"harsh","userId":"64eb9495773b76678bff517f","_id":{"$oid":"6501c134c2a135b15760f45c"},"answeredOn":{"$date":{"$numberLong":"1694613812279"}}},{"answerBody":"asdf","userAnswered":"atemp","userId":"64f995e45daccfbe0ca5f83b","_id":{"$oid":"6501c152c2a135b15760f471"},"answeredOn":{"$date":{"$numberLong":"1694613842333"}}}],"__v":{"$numberInt":"0"}} same like one record of database of question
        

        //now from schema we can see that upVote is an array of string which is nothing but id's of that user who have done this upvotes to that question so we need to find idx of that person who wan't to upvote

        const upIndex=question.upVote.findIndex((id)=> (id === String(userId))); //it is something like we are looping through out upVote array and comparing existing value(id) and value(userId) that we want to check weather it exist there or not if that exit than it will be some value(idx of that id) else it will be -1
        const downIndex=question.downVote.findIndex((id)=>(id === String(userId)));


        //reference : blank page
        if(value === ("upVote")){//we wan't to upvote
            if(downIndex !== -1){//we haven't done downvote
                question.downVote=question.downVote.filter((id)=> id !== (String(userId)));//we are removing that id from downVote array
            }
            if(upIndex === -1){//user haven't upvated
                question.upVote.push(userId)//we are adding that user in to upVote list who wan't ro upvote
            }
            // if(upVote !== -1){//user already have upvoted

            // }
            //or
            else{
                question.upVote=question.upVote.filter((id) => (id !== (String(userId))));
            }
        }
        else if(value === ("downVote")){
            if(upIndex !== -1){
                question.upVote=question.upVote.filter((id)=> id !== (String(userId)));
            }
            if(downIndex === -1){
                question.downVote.push(userId)
            }
            // if(downVote !== -1){

            // }
            //or
            else{
                question.downVote=question.downVote.filter((id) => (id !== (String(userId))));
            }
        }
        //till now we have retrived record from database and stored in question and changed it now we want to update that record with this modified record(i.e. question) 
        await Questions.findByIdAndUpdate(_id , question);//we setted existing record with id as _id with question object
        res.status(200).json({message: "voted successfully..."}); 


    } catch (error) {
        res.status(404).json({message: "Id not found"});
    }
}