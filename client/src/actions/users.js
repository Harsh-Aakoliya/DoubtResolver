import * as api from "../api"
export const fetchAllUsers=()=>async(dispatch)=>{
    try {
        const {data}=await api.fetchAllUsers();//we will get all the users using api request and stored into data
        dispatch({type:"FETCH_USERS",  payload:data });//storing data to REDUX

    } catch (error) {
        console.log(error);
    }
}


//for updating profile
export const updateProfile=(id,updateData)=>async(dispatch)=>{
    try {
        const {data}=await api.updateProfile(id,updateData);//destructring id and updateData into data
        dispatch({type:"UPDATE_CURRENT_USER",payload:data});//here data will contain only one user's data that we wants to update
    } catch (error) {
        console.log(error);
    }
} 