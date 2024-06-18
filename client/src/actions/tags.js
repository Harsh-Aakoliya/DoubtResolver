import * as api from "../api"
export const fetchAllTags=()=>async(dispatch)=>{
    try {
        console.log("Got request to fetchall the tags :")
        const {data}=await api.fetchAllTags();
        // console.log("data we got from backend for tags is ",data);
        await dispatch({type:"FETCH_TAGS",  payload:data });//storing data to REDUX
    } catch (error) {
        console.log("got error for featching all the tags",error);     
    }
}

export const postNewTags=(newTagsToAdd)=>async(dispatch)=>{
    try {
        const {data}=await api.addNewTag(newTagsToAdd);
        console.log("after adding new tags to database in action file",data);
        await dispatch({type:"POST_TAGS",payload:data});
        await dispatch(fetchAllTags());

    } catch (error) {
        console.log("error get at action file of tags.js",error);
    }   
}

// for updating tag
export const updateTags = (id, updateData) => async (dispatch) => {
    // console.log("2 this is in action folder of frontend",id,updateData);
    try {
        const { data } = await api.updateTags(id, updateData);
        console.log("Data received after updatating tags:", data);

        await dispatch({ type: "UPDATE_TAGS", payload: data });
    } catch (error) {
        console.log(error);
    }
};