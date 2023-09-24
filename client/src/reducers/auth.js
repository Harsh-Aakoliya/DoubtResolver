//this is auth reducer

//here actions will be like login , signup and all
const authReducer=(state={data:null},action)=>{
    switch (action.type) {
        case "AUTH":
            //there are three types of storage where we can store data 1) in cookies 2) sessions and 3) localstorage of browser
            localStorage.setItem("Profile",JSON.stringify({ ...action?.data}));//?. is like if data is not null then we will store it 
            return { ...state,data:action?.data};
        case "LOGOUT":
            localStorage.clear();//we are deleting existing profile
            return { ...state,data:null};
        default:
            return state;
    }
}

export default authReducer