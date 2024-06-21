// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { askQuestion } from "../../actions/question";
// import { postNewTags } from '../../actions/tags';
// import Tags from '../../components/Tags/Tags';
// import "./AskQuestion.css";

// const AskQuestion = () => {
//     const [questionTitle, setQuestionTitle] = useState("");
//     const [questionBody, setQuestionBody] = useState("");
//     const [selectedTags, setSelectedTags] = useState([]);
//     const [createdTags, setCreatedTags] = useState([]);
//     const [loadingQuestionPost, setLoadingQuestionPost] = useState(false); // Loading state for question post
//     const [loadingTagsPost, setLoadingTagsPost] = useState(false); // Loading state for tags post

//     const dispatch = useDispatch();
//     const User = useSelector((state) => state.currentUserReducer);
//     const tagList = useSelector((state) => state.tagReducer);
//     const navigate = useNavigate();

//     useEffect(() => {
//         // Cleanup function to reset loading states
//         return () => {
//             setLoadingQuestionPost(false);
//             setLoadingTagsPost(false);
//         };
//     }, []);

//     const handlePostTags = async (createdTags) => {
//         try {
//             setLoadingTagsPost(true); // Start loading state for tags post

//             for (let i in createdTags) {
//                 await dispatch(postNewTags(createdTags[i])).then(() => {
//                     console.log("Posted", createdTags[i], "successfully");
//                 }).catch(error => {
//                     console.log("Error while posting tag", createdTags[i]);
//                 });
//             }

//             setLoadingTagsPost(false); // Stop loading state for tags post
//         } catch (error) {
//             console.error("Error in handlePostTags:", error);
//             setLoadingTagsPost(false); // Stop loading state on error
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
    
//         let allTags = [...selectedTags.map(tag => tag.tagTitle)];
    
//         for (let tag of createdTags) {
//             allTags.push(tag.tagTitle);
//         }
    
//         try {
//             setLoadingQuestionPost(true); // Start loading state for question post
    
//             const newQuestionData = {
//                 questionTitle,
//                 questionBody,
//                 questionTags: allTags,
//                 userPosted: User.result.name,
//                 userId: User?.result?._id
//             };
    
//             dispatch(askQuestion(newQuestionData))
//                 .then(() => {
//                     setLoadingQuestionPost(false); // Stop loading state for question post
//                     handlePostTags(createdTags); // Post the tags sequentially after question is posted
//                     navigate("/"); // Navigate to home after question and tags are posted
//                 })
//                 .catch(error => {
//                     console.error("Error in handleSubmit:", error);
//                     setLoadingQuestionPost(false); // Stop loading state for question post on error
//                 });
    
//         } catch (error) {
//             console.error("Error in handleSubmit:", error);
//             setLoadingQuestionPost(false); // Stop loading state for question post on error
//         }
//     };
    

//     const handleEnter = (e) => {
//         if (e.key === "Enter") {
//             setQuestionBody(questionBody + "\n");
//         }
//     };

//     return (
//         <div className="ask-question">
//             <div className="ask-ques-container">
//                 <h1>Ask a public Question</h1>
//                 <form onSubmit={handleSubmit}>
//                     <div className="ask-form-container">
//                         <label htmlFor="ask-ques-title">
//                             <h4>Title</h4>
//                             <p>Be specific because you are asking a question to another person</p>
//                             <input
//                                 type='text'
//                                 id='ask-ques-title'
//                                 placeholder='e.g. Question no 1'
//                                 value={questionTitle}
//                                 onChange={(event) => setQuestionTitle(event.target.value)}
//                             />
//                         </label>

//                         <label htmlFor="ask-ques-body">
//                             <h4>Body</h4>
//                             <p>Include all the information that you have</p>
//                             <textarea
//                                 id="ask-ques-body"
//                                 cols="30"
//                                 rows="10"
//                                 value={questionBody}
//                                 onChange={(event) => setQuestionBody(event.target.value)}
//                                 onKeyDown={handleEnter}
//                             ></textarea>
//                         </label>

//                         <label htmlFor="ask-ques-tags">
//                             <h4>Tags</h4>
//                             <p>Add up to 5 tags to enhance results</p>
//                             <Tags
//                                 selectedTags={selectedTags}
//                                 createdTags={createdTags}
//                                 setSelectedTags={setSelectedTags}
//                                 setCreatedTags={setCreatedTags}
//                                 tagList={tagList}
//                             />
//                         </label>
//                     </div>
//                     <input type='submit' value='Review your question' className='review-btn' />

//                     {loadingQuestionPost && <div className="loading-overlay">Posting your Question...</div>} {/* Loading indicator for question post */}
//                     {loadingTagsPost && <div className="loading-overlay">Posting Tags...</div>} {/* Loading indicator for tags post */}
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default AskQuestion;




import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { askQuestion } from "../../actions/question";
import { postNewTags,fetchAllTags, updateTags } from '../../actions/tags';
import Tags from '../../components/Tags/Tags';
import "./AskQuestion.css";
import store from '../..';

const AskQuestion = () => {
    const [questionTitle, setQuestionTitle] = useState("");
    const [questionBody, setQuestionBody] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);
    const [createdTags, setCreatedTags] = useState([]);
    const [loadingQuestionPost, setLoadingQuestionPost] = useState(false); // Loading state for question post
    const [loadingTagsPost, setLoadingTagsPost] = useState(false); // Loading state for tags post
    const [loadingTagQuestionAdd,setLoadingTagQuestionAdd]=useState(false);


    const dispatch = useDispatch();
    const User = useSelector((state) => state.currentUserReducer);
    const tagList = useSelector((state) =>{
        console.log("stat in useselectore",state);
        console.log("return ing thing is ",state.tagReducer.data);
        return state.tagReducer.data
    });
    const navigate = useNavigate();

    // const [allTagListDB,setAllTagListDB]=useState(tagList);
    useEffect(() => {
        // Cleanup function to reset loading states
        // setAllTagListDB(tagList);
        console.log("inside useEffect",tagList);
        dispatch(fetchAllTags());
        return () => {
            console.log("inside useEffect callback",tagList);
            // setLoadingQuestionPost(false);
            // setLoadingTagsPost(false);
        };
    }, [dispatch]);

    const handleQuestionAdd=async (allTagsTitle,id) =>{
        console.log("6) posting id to all tags")
        setLoadingTagQuestionAdd(true);
        console.log("all the tags and id to operate",allTagsTitle,id);
        try {
            (dispatch(fetchAllTags({message:"in handleQuestionAdd function"})))
            .then(async (data)=>{
                console.log("7) after fetching all tags");
                //write logic so that after getting the data only code below this like will run 
                console.log("store in function ",store.getState().tagReducer.data);
                // let allTagListDB=tagList;
                let allTagListDB=store.getState().tagReducer.data;
                console.log("tag list in use",tagList);
                let allTagsIds=[]

                console.log(("Here in handlequnadd function",allTagListDB));
                for (let tag of allTagsTitle) {
                    console.log("ith tag", tag);
                    let ith = allTagListDB.find(tagii => tagii.tagTitle === tag);
                    console.log("ith", ith);
                
                    // Check if the ID already exists in the allQuestions array
                    if (!ith.allQuestions.includes(id)) {
                        ith.allQuestions.push(id);
                    }
                
                    await dispatch(updateTags(ith._id, ith))
                        .then((data) => {
                            console.log("updated object for tag is ", data);
                        })
                        .catch((error) => console.log("error occurred while updating tag", error));
                
                    allTagsIds.push(ith._id);
                }
                
                console.log("all selected tag list id",allTagsIds);

                // for(let tag in allTags){
                //     let tagdata=allTagListDB.filter((tagi)=>(tagi._id === tag));
                //     let curquestions=tagdata.allQuestions;
                //     curquestions.push(id);
                //     console.onChange(curquestions);

                //     // await dispatch(updateTags({}))
                //     //     .then(async (data)=>{
                //     //         console.log(tag," Updated successfully from frontend");
                //     //     })
                //     //     .catch(error=>{
                //     //         console.log("There is an error while updating tag",error);
                //     //     })
                // }
            })
            .catch(error=>{
                console.log("got error while fetching all the tags in handleQuestionAdd function ",(error));
            })
        } catch (error) {
            console.log(error);   
        }

        console.log("8) return from pushing id to all tags")
        setLoadingTagQuestionAdd(false);
    }
    const handlePostTags = async (createdTags) => {
        console.log("2) inside handle post")
        try {
            setLoadingTagsPost(true); // Start loading state for tags post

            for (let tag of createdTags) {
                await dispatch(postNewTags(tag)).then(() => {
                    console.log("3) Posted", tag, "successfully");
                }).catch(error => {
                    console.log("Error while posting tag", tag);
                });
            }

            setLoadingTagsPost(false); // Stop loading state for tags post
        } catch (error) {
            console.error("Error in handlePostTags:", error);
            setLoadingTagsPost(false); // Stop loading state on error
        }
        console.log("4) retu after posting tag");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("created tags",createdTags);
        console.log("selected tags",selectedTags);

        
        

        let alltagsBackend =selectedTags;//array with titles
        for (let tag of createdTags) {
            alltagsBackend.push(tag.tagTitle);
        }

        try {
            setLoadingQuestionPost(true); // Start loading state for question post

            const newQuestionData = {
                questionTitle,
                questionBody,
                questionTags: alltagsBackend,
                userPosted: User.result.name,
                userId: User?.result?._id
            };

            dispatch(askQuestion(newQuestionData))
                .then(async (data) => {
                    console.log("1) data got from backend ",data);
                    setLoadingQuestionPost(false); // Stop loading state for question post
                    await handlePostTags(createdTags)
                        .then(()=>{
                            console.log("5) after posting all the tags")
                            handleQuestionAdd(alltagsBackend,data._id);
                            console.log("handled updating question list of tags")
                        })
                    navigate("/");
                })
                .catch(error => {
                    console.error("Error in handleSubmit:", error);
                    setLoadingQuestionPost(false); // Stop loading state for question post on error
                });

        } catch (error) {
            console.error("Error in handleSubmit:", error);
            setLoadingQuestionPost(false); // Stop loading state for question post on error
        }
    };


    const handleEnter = (e) => {
        if (e.key === "Enter") {
            setQuestionBody(questionBody + "\n");
        }
    };

    return (
        <div className="ask-question">
            <div className="ask-ques-container">
                <h1>Ask a public Question</h1>
                <form onSubmit={handleSubmit}>
                    <div className="ask-form-container">
                        <label htmlFor="ask-ques-title">
                            <h4>Title</h4>
                            <p>Be specific because you are asking a question to another person</p>
                            <input
                                type='text'
                                id='ask-ques-title'
                                placeholder='e.g. Question no 1'
                                value={questionTitle}
                                onChange={(event) => setQuestionTitle(event.target.value)}
                            />
                        </label>

                        <label htmlFor="ask-ques-body">
                            <h4>Body</h4>
                            <p>Include all the information that you have</p>
                            <textarea
                                id="ask-ques-body"
                                cols="30"
                                rows="10"
                                value={questionBody}
                                onChange={(event) => setQuestionBody(event.target.value)}
                                onKeyDown={handleEnter}
                            ></textarea>
                        </label>

                        <label htmlFor="ask-ques-tags">
                            <h4>Tags</h4>
                            <p>Add up to 5 tags to enhance results</p>
                            <Tags
                                selectedTags={selectedTags}
                                createdTags={createdTags}
                                setSelectedTags={setSelectedTags}
                                setCreatedTags={setCreatedTags}
                                tagList={tagList}
                            />
                        </label>
                    </div>
                    <input type='submit' value='Review your question' className='review-btn' />

                    {loadingQuestionPost && <div className="loading-overlay">Posting your Question...</div>} {/* Loading indicator for question post */}
                    {loadingTagsPost && <div className="loading-overlay">Posting Tags...</div>} {/* Loading indicator for tags post */}
                    {loadingTagQuestionAdd && <div className="loading-overlay">Posting Tag's questoin list...</div>} {/* Loading indicator for tags post */}
                </form>
            </div>
        </div>
    );
};

export default AskQuestion;


