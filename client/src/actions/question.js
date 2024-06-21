import React from 'react'
import *as api from  '../api'



//when ever we trigger button review question of askquestion page it will call this function
//below double arrow function is syntex for redux thunk
export const askQuestion = (questionData) =>async (dispatch) => {
    try {
        // console.log("inside askquestion",questionData);
        const {data} =await api.postQuestion(questionData)//this will call the function psotQuestion of index.js in api folder
        console.log("there in action file after posting the questtion ",data);
        dispatch({type:"POST_QUESTION",payload:data})
        dispatch(fetchAllQuestions({message:"askQuestion on action file"}));
        console.log("all featched questino");
        return data;
    } catch (error) {
        console.log(error);
    }
}

// export default askQuestion


//for calling this there is no button --> like if we click on this button then it will call this function and we will display all the existing question from data base instead of that if whenever our applicaiton being live then we need to call this function for displying all the question so we can use useEffect hook in App.js file itself
export const fetchAllQuestions = (props) => async (dispatch) =>{

    console.log("data has been fetched for",props?.message);
    try {
        const {data}= await api.getAllQuestions();
        await dispatch({type: "FETCH_ALL_QUESTIONS",payload : data}) //storing data to REDUX store
    } catch (error) {
        console.log(error);
    }
}




//this function will be called when we click on delete button

export const deleteQuestion = (id,navigate) => async(dispatch) => {
    try {
        const {data} =await api.deleteQuestion(id)//here as we are deleting question so we will not get any data from backend we will get message so no need to dispatch it to REDUX store
        await dispatch(fetchAllQuestions({message:"deleteQuestion of action file"}));//now quesiton with that id has beed deleted so we need to refetch all the quetion 
        //as soon as question is deleted page with that question will not exist so we need to navigate to home page
        navigate("/");

    } catch (error) {
        console.log(error);
    }
}

//id for which is question id, value is weather it is up or down, userId is who want's up and down that vote
export const voteQuestion =(id,value,userId)=>async(dispatch)=>{
    try {
        const { data }=await api.voteQuestion(id,value,userId);
        await dispatch(fetchAllQuestions({message:"Vote question of action file"}));
    } catch (error) {
        console.log(error);
    }
}





//................Actions related to answer


//this function will be called when we click on post your answer below to body of your answer  
export const postAnswer = (answerData) => async(dispatch) =>{
    try {
        const {id,noOfAnswers,answerBody,userAnswered,userId} = answerData;//destrucring {id,noOfAnswers,answerBody,userAnswered} as answerData
        const {data}=await api.postAnswer(id,noOfAnswers,answerBody,userAnswered,userId) //retriving data from backend using api
    
        await dispatch({type:"POST_ANSWER",payload:data});
        await dispatch(fetchAllQuestions({message:"postAnswer of action file"}));
    } catch (error) {
        console.log(error);
    }
}

export const deleteAnswer =(id,answerId,noOfAnswers) => async(dispatch) =>{
    try {
        const {data} = await api.deleteAnswer(id,answerId,noOfAnswers);
        //now after getting successful execution of above api request we need to dispatch questions so basically it will automatically refresh all the answer that we have provided because as we are dispatching question we already have do with answer
        await dispatch(fetchAllQuestions({message:"deleteAnswer of action file"}));

    } catch (error) {
        console.log(error);
    }
}