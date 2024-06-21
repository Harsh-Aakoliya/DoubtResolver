const tagReducer=(state=[],action)=>{
    switch(action.type){
        case "FETCH_TAGS":
            console.log("action in reducer of tags.js",action.payload);
            return { ...state,data:action.payload }
        case "POST_TAGS":
            return {...state};
        case "UPDATE_TAGS":
            return {
                ...state,
                data: state.data.map(tag => (tag._id === action.payload._id) ? { ...tag, ...action.payload } : tag)
            };
        default:
            return state;
    }
}

export default tagReducer;