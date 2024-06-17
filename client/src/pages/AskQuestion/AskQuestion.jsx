import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { askQuestion, fetchAllQuestions } from "../../actions/question";
import { fetchAllTags, postNewTags, updateTags } from '../../actions/tags';
import Tags from '../../components/Tags/Tags';
import './AskQuestion.css';

const AskQuestion = () => {
    const [questionTitle, setQuestionTitle] = useState("");
    const [questionBody, setQuestionBody] = useState("");
    const [curtag, setCurTag] = useState("");

    const [selectedTags, setSelectedTags] = useState([]);
    const [createdTags, setCreatedTags] = useState([]);

    const dispatch = useDispatch();
    const User = useSelector((state) => state.currentUserReducer);
    const tagList = useSelector((state) => state.tagReducer);
    let questionsList = useSelector((state) => state.questionsReducer);
    const navigate = useNavigate();

    
    

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        console.log("selected tags", selectedTags);
        console.log("created tags", createdTags);
    
        let alltags = [...selectedTags.map(tag => tag.tagTitle)];
    
        for (let tag of createdTags) {
            alltags.push(tag.tagTitle);
        }
        console.log("All the tags to send backend", alltags);
    
        try {
            const newQuestionData = {
                questionTitle,
                questionBody,
                questionTags: alltags,
                userPosted: User.result.name,
                userId: User?.result?._id
            };
    
            // Dispatch askQuestion and wait for it to complete
            const newQuestion = await dispatch(askQuestion(newQuestionData, navigate));
            console.log("newQuestion that got from backend", newQuestion);
    
            // After asking question, dispatch postNewTags for each created tag
            for (let tag of createdTags) {
                await dispatch(postNewTags(tag));
            }
    
            // Finally, fetch all tags and questions after both previous operations are done
            await dispatch(fetchAllTags());
            await dispatch(fetchAllQuestions());
    
            // Once all dispatches are completed, you can now operate on questionsList
            console.log("all the questionlist for operation", questionsList);
    
        } catch (error) {
            console.error("Error in handleSubmit:", error);
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
                </form>
            </div>
        </div>
    );
};

export default AskQuestion;


