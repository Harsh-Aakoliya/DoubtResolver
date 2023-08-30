import *as api from  '../api'


//as we are dealing with react thunk we need async()=> 
export const signup =(authData,navigate)=>async(dispatch)=>{
    try{
        const {data} =await api.signUp(authData);
        dispatch({type:'AUTH',data}) //this will goto reducer and in auth.js file of reducer we are checking type is same as "AUTH" or not using switch case of action and data that we have fetched using api
        navigate("/")//after signup we will navigate to home
    }
    catch(error){
        console.log(error)
    }
}
export const login =(authData,navigate)=>async(dispatch)=>{
    try{
        const {data} =await api.logIn(authData);
        dispatch({type:'AUTH',data}) 
        navigate("/")//after signup we will navigate to home
    }
    catch(error){
        console.log(error)
    }
}