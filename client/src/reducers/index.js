//18) we have many reducers like for auth and questions and tags and all.
//now we can have seperate files for all this reducers 


import { combineReducers } from "redux";
import authReducer from "./auth";



//18) here we will export all the reducers 
export default combineReducers({
    authReducer
})