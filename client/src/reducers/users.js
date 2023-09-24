const usersReducer=(states=[],action)=>{//here state is nothing but array of object which contains data of all ther users
    switch (action.type) {
        case "FETCH_USERS":
            return action.payload; //returing all the data of all ther users that we have received
        case "UPDATE_CURRENT_USER"://here we need to return that user's data that we have updated so from already existing list (state) we need to compare or actions id (user's id that we want's to update) so if we found it then we will return it else the same state we will return 
            return states.map((state)=> (state._id === action.payload._id) ? action.payload : state);
        default:
            return states;
    }
}
export default usersReducer;