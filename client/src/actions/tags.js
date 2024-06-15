import * as api from "../api"
export const fetchAllTags=()=>async(dispatch)=>{
    try {
        const {data}=await api.fetchAllTags();
        console.log("data we got from backend for tags is ",data);
        dispatch({type:"FETCH_TAGS",  payload:data });//storing data to REDUX
    } catch (error) {
        console.log("got error for featching all the tags",error);     
    }
}

export const postNewTags=(newTagsToAdd)=>async(dispatch)=>{
    try {
        const {data}=await api.addNewTag(newTagsToAdd);
        console.log("after adding new tags to database in action file",data);
        dispatch({type:"POST_TAGS",payload:data});
        dispatch(fetchAllTags());

    } catch (error) {
        console.log("error get at action file of tags.js",error);
    }   
}