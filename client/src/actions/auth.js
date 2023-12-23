// import *as api from  '../api'
// import { setCurrentUser } from './currentUser';


// //as we are dealing with react thunk we need async()=> 
// export const signup =(authData,navigate)=>async(dispatch)=>{
//     try{
//         const {data} =await api.signUp(authData);
//         dispatch({type:'AUTH',data}) //this will goto reducer and in auth.js file of reducer we are checking type is same as "AUTH" or not using switch case of action and data that we have fetched using api
//         // var User=JSON.parse(localStorage.getItem("Profile")) here is the issue resoved why we are dispatching data to REDUX
//         //here we can see that as dispatching {name,email and password } from auth.js page of Auth we have created auth.js file in action and have dedicated function (signup) for that
//         //similerly we should have currentUser function i.e. file in action folder so that we can use that action when ever we dispatching data from any where
//         dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))))//we are storing data to REDUX (setCurrectUser is in currentUser.js file of actions folder)
//         navigate("/")//after signup we will navigate to home
//     }
//     catch(error){
//         console.log(error)
//     }
// }
// export const login =(authData,navigate)=>async(dispatch)=>{
//     try{
//         const {data} =await api.logIn(authData);
//         dispatch({type:'AUTH',data}) 
//         dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))))
//         navigate("/")//after login we will navigate to home
//     }
//     catch(error){
//         console.log(error)
//     }
// }



// auth.js

// ... other imports
import *as api from  '../api'
import { setCurrentUser } from './currentUser';

export const signup = (authData, navigate) => async (dispatch) => {
    try {
      const { data } = await api.signUp(authData);
      dispatch({ type: 'AUTH', data });
      dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))));
      navigate('/');
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 404) {
        // User already exists
        alert('User already exists.');
      } else {
        // Other server errors
        alert('Error during signup. Please try again later.');
      }
    }
  };
  

  export const login = (authData, navigate) => async (dispatch) => {
    try {
      const { data } = await api.logIn(authData);
      dispatch({ type: 'AUTH', data });
      dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))));
      navigate('/');
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 404) {
        // User not found
        alert('User not found.');
      } else if (error.response && error.response.status === 400) {
        // Invalid credentials
        alert('Invalid credentials. Email and password do not match.');
        
      } else {
        // Other server errors
        alert('Error during login. Please try again later.');
      }
    }
  };