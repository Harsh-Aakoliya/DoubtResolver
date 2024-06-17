const tagReducer=(state=[],action)=>{
    switch(action.type){
        case "FETCH_TAGS":
            return action.payload;
        case "POST_TAGS":
            return {...state};
        case "UPDATE_TAGS":
            return state.map((tag) => (tag._id === action.payload._id) ? { ...tag, ...action.payload } : tag);
        default:
            return state;
    }
}

export default tagReducer;