//this file is for handle request for send data and retrive data from backend
import axios from 'axios'
const API=axios.create({baseURL : "http://localhost:5000"})


//we can use this both into auth.js file of actions
export const logIn=(authData)=>API.post("/user/login",authData);//calling api request to backend for given url "localhost:5000/user/login" with data as authData(which have {username,email,password})
export const signUp=(authData)=>API.post("/user/signup",authData);