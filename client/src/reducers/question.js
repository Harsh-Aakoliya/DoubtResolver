const questionsReducer = (state = {data:null},action )=>{
    switch (action.type) {
        case "POST_QUESTION":
            return { ...state };//here we don't have to pass action.payload because for POST_QUESTION in response from controllers of questions.js file we are sending one message like "posted question successfully" but in action.pyload which nothing but question detail object like upvotes, downvotes, title and all..
        case "POST_ANSWER":
            return { ...state };
        case "FETCH_ALL_QUESTIONS":
            return { ...state, data : action.payload };
        default:
            return state;
    }
}
export default questionsReducer;