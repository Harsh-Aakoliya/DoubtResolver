// const usersReducer=(states=[],action)=>{//here state is nothing but array of object which contains data of all ther users
//     switch (action.type) {
//         case "FETCH_USERS":
//             return action.payload; //returing all the data of all ther users that we have received
//             // case "UPDATE_CURRENT_USER"://here we need to return that user's data that we have updated so from already existing list (state) we need to compare or actions id (user's id that we want's to update) so if we found it then we will return it else the same state we will return 
//             case "UPDATE_CURRENT_USER":
//             console.log("printing payload",action.payload);
//             return states.map((state) => (state._id === action.payload._id) ? { ...state, ...action.payload } : state);
//         default:
//             return states;
//         }
//         //     // return states.map((state)=> (state._id === action.payload._id) ? action.payload : state);
//         //     return states.map((state)=> (state._id === action.payload._id) ? action.payload : state);
// }
// export default usersReducer;

// users.js reducer
const usersReducer = (state = [], action) => {
    switch (action.type) {
      case "FETCH_USERS":
        return action.payload;
      case "UPDATE_CURRENT_USER":
        console.log("all data at reducer",state);
        console.log("payload",action.payload);
        return state.map((user) => (user._id === action.payload._id) ? { ...user, ...action.payload } : user);
      default:
        return state;
    }
  }
  
  export default usersReducer;
  