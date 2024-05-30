import * as api from "../api"
export const fetchAllUsers=()=>async(dispatch)=>{
    try {
        const {data}=await api.fetchAllUsers();//we will get all the users using api request and stored into data
        console.log("fetchallusers",data);
        dispatch({type:"FETCH_USERS",  payload:data });//storing data to REDUX

    } catch (error) {
        console.log(error);     
    }
}


//for updating profile

// export const updateProfile=(id,updateData)=>async(dispatch,getState)=>{
//     try {
//         const {data}=await api.updateProfile(id,updateData);//destructring id and updateData into data
//         console.log("here in action folder of users", data);
//         dispatch({type:"UPDATE_CURRENT_USER",payload:data});//here data will contain only one user's data that we wants to update
//     // Log the Redux state after the update
//     const currentState = getState().usersReducer;
//     console.log("Redux State After Update:", currentState);
//     } catch (error) {
//         console.log(error);
//     }
// } 

// users.js action file

// for updating profile
export const updateProfile = (id, updateData) => async (dispatch) => {
    console.log("2 this is in action folder of frontend",id,updateData);
    try {
        const { data } = await api.updateProfile(id, updateData);
        console.log("Data received after profile update:", data);

        dispatch({ type: "UPDATE_CURRENT_USER", payload: data });
    } catch (error) {
        console.log(error);
    }
};
