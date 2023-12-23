import mongoose from "mongoose";//for database
import Questions from "../models/Questions.js";//for schema of perticular question


export const postAnswer=async(req,res)=>{
    //collecting all the parts from front end that we need to change or add answer 

    const { id: _id}=req.params; //params actually extracts id from given url like if this http://localhost:3000/Question/64f41b442d775c90e8f2c5c8 is url then req.params will extract 64f41b442d775c90e8f2c5c8 and id: _id means we are renaming id to _id
    const {noOfAnswers , answerBody, userAnswered , userId}=req.body;
    


    //so till now we have collected all the parts of question from frontend and now we are checking with database

    //now moongoDB have function to check weather given id is valid or not if id is not valid then question will also not avilable so we just checking it
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send("Question is not avilable");
    }
    
    //now question is valid and we need to modify it bcz we are adding answer to that
    
    updateNoOfQuestions( _id , noOfAnswers);
    try {
        //Questions is schema imported above 
        const updatedQuestion= await Questions.findByIdAndUpdate(_id,{ $addToSet : {'answer' : [{ answerBody , userAnswered , userId }]} }); //here findByIdAndUpdate moongoDB has function which accept parameter as id and query which has 'answer' which is array of object (refere schema) like first answer will be object and have  answerBody , userAnswered , userId : req.userId (which is who have answered ), second answer also will have same and third ans so on in the array so given answer will be added in to 'answer' schema using function $addToSet  for question id as _id 

        res.status(200).json(updatedQuestion);
    } catch (error) {
        res.status(400).json(error);
    }
}



//function to set no of answers that has been answered 
const updateNoOfQuestions=async (_id,noOfAnswers)=>{
    try {
        await Questions.findByIdAndUpdate( _id, { $set: { "noOfAnswers" : noOfAnswers }});
    } catch (error) {
        console.log(error);
    }
}


//function to delete answer

export const deleteAnswer= async (req,res)=>{
    const { id: _id}=req.params;
    const {answerId,noOfAnswers}=req.body; //answerId will help to delete that question and noOfAnswer we need to decrease after deleting answer

    //now we need to check that weather questionid(_id) as well as answerId is valid or not
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send("Question is not avilable");
    }
    if(!mongoose.Types.ObjectId.isValid(answerId)){
        return res.status(404).send("Answer is not avilable");
    }
    
    //now both question and answer is valid that we want to delete 

    updateNoOfQuestions(_id,noOfAnswers);


    try {
        //below query will do like if question with id as _id have any answer in 'answer' array with _id as answerId then pull(remove) it
        await Questions.updateOne({_id},{$pull : {"answer" : { _id: answerId}}});
        res.status(200).json({message : "Answer deleted successfully"});
    } catch (error) {
        res.status(404).json(error);
    }
}