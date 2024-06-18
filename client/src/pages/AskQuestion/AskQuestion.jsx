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
import { postNewTags } from '../../actions/tags';
import Tags from '../../components/Tags/Tags';
import "./AskQuestion.css";

const AskQuestion = () => {
    const [questionTitle, setQuestionTitle] = useState("");
    const [questionBody, setQuestionBody] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);
    const [createdTags, setCreatedTags] = useState([]);
    const [loadingQuestionPost, setLoadingQuestionPost] = useState(false); // Loading state for question post
    const [loadingTagsPost, setLoadingTagsPost] = useState(false); // Loading state for tags post

    const dispatch = useDispatch();
    const User = useSelector((state) => state.currentUserReducer);
    const tagList = useSelector((state) => state.tagReducer);
    const navigate = useNavigate();

    // useEffect(() => {
    //     // Cleanup function to reset loading states
    //     return () => {
    //         setLoadingQuestionPost(false);
    //         setLoadingTagsPost(false);
    //     };
    // }, []);

    const handlePostTags = async (createdTags) => {
        try {
            setLoadingTagsPost(true); // Start loading state for tags post

            for (let tag of createdTags) {
                await dispatch(postNewTags(tag)).then(() => {
                    console.log("Posted", tag, "successfully");
                }).catch(error => {
                    console.log("Error while posting tag", tag);
                });
            }

            setLoadingTagsPost(false); // Stop loading state for tags post
            navigate("/");
        } catch (error) {
            console.error("Error in handlePostTags:", error);
            setLoadingTagsPost(false); // Stop loading state on error
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let allTags = [...selectedTags.map(tag => tag.tagTitle)];

        for (let tag of createdTags) {
            allTags.push(tag.tagTitle);
        }

        try {
            setLoadingQuestionPost(true); // Start loading state for question post

            const newQuestionData = {
                questionTitle,
                questionBody,
                questionTags: allTags,
                userPosted: User.result.name,
                userId: User?.result?._id
            };

            dispatch(askQuestion(newQuestionData))
                .then(() => {
                    setLoadingQuestionPost(false); // Stop loading state for question post
                    handlePostTags(createdTags); // Post the tags sequentially after question is posted
                    // navigate("/"); // Navigate to home after question and tags are posted
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
                </form>
            </div>
        </div>
    );
};

export default AskQuestion;
