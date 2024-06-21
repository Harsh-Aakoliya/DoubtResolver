import * as api from "../api"
export const fetchAllTags=(props)=>async(dispatch)=>{
    try {
        console.log("Got request to fetchall the tags :",props?.message)
        await api.fetchAllTags()
        .then(async (res)=>{
            console.log("data need to send in store",res.data)
            // console.log("data we got from backend for tags is ",data);
            console.log("here in dispatching to redux store",dispatch({type:"FETCH_TAGS",  payload:res.data }));
        })
        .catch(error=>{
            console.log("error whild fetching tags",error);
        })
    } catch (error) {
        console.log("got error for featching all the tags",error);     
    }
}



export const postNewTags=(newTagsToAdd)=>async(dispatch)=>{
    try {
        console.log("new data of tags to add",newTagsToAdd);
        const {data}=await api.addNewTag(newTagsToAdd);
        console.log("after adding new tags to database in action file",data);
         dispatch({type:"POST_TAGS",payload:data});
         dispatch(fetchAllTags({message:"after posting new question"}));
         return data;
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
        dispatch(fetchAllTags({message:"after posting new question"}));

    } catch (error) {
        console.log(error);
    }
};