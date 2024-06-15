const tagReducer=(state=[],action)=>{
    switch(action.type){
        case "FETCH_TAGS":
            return action.payload;
        case "POST_TAGS":
            return {...state};
        default:
            return state;
    }
}

export default tagReducer;