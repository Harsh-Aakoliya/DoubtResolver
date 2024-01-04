//this file is for handle request for send data and retrive data from backend
import axios from 'axios'
// const API=axios.create({baseURL : "https://stackoverflow-clone-bf06.onrender.com"})
const API=axios.create({baseURL : "http://localhost:5000"})


//by below code we are incresing the security of our all the request
//refere changes https://stackoverflow.com/questions/72589579/what-is-canceltoken-by-axios-and-how-i-fix-it
API.interceptors.request.use((req)=>{//req is for each and every req that we are sending to reducer folder via this API file
    if(localStorage.getItem("Profile")){//if we have logged in
        //now for any request in reducer file to retriver any data like noOfAnswer, answerList... we are using req.body now it also has req.headers now we are adding some value to that header in order to increase security
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("Profile")).token}`;//now for each and every request before accessing controller using this below request first of all we need to check weather our token is valid or not using middleware file
    }
    return req;
})


//In general for all request that we are sending like post("/user/login",parameter) must be same as we are expecting from backend. for parameter most of the time we are sending parameter as same as we got like in export const logIn=(authData)=>API.post("/user/login",authData) we are receiving authData and sending as it is in parameter and for export const deleteAnswer = (id,answerId,noOfAnswers)=>API.patch(`/answer/delete/${id}`,{answerId,noOfAnswers}); we are using calling parameter id for request url and remaining two calling parameter is sended to backend via creating object like {answerId,noOfAnswers}

//for authentication

//we can use this both into auth.js file of actions

export const logIn=(authData)=>API.post("/user/login",authData);//calling api request to backend for given url "localhost:5000/user/login" with data as authData(which have {username,email,password})
export const signUp=(authData)=>API.post("/user/signup",authData);


//for posting question

export const postQuestion=(questionData)=>API.post("/questions/Ask",questionData);
export const getAllQuestions = () => API.get("/questions/get"); //so when ever getAllQuestions function will be called then this will retrive all the data from database and return it
//for deleting question
export const deleteQuestion = (id) => API.delete(`/questions/delete/${id}`);


//for answering question 
export const postAnswer=(id,noOfAnswers,answerBody,userAnswered,userId)=>API.patch(`/answer/post/${id}`,{noOfAnswers,answerBody,userAnswered,userId});

//for deleting answer
export const deleteAnswer = (id,answerId,noOfAnswers)=>API.patch(`/answer/delete/${id}`,{answerId,noOfAnswers});


//for deleting question
export const voteQuestion=(id,value,userId)=>API.patch(`/questions/vote/${id}`,{value,userId});


//for users page
export const fetchAllUsers = ()=>API.get("/user/getAllUsers");

//for updating profile
export const updateProfile =(id,updateData)=>API.patch(`/user/update/${id}`,updateData);