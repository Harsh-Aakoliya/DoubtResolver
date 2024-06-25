import React, { useEffect, useState } from 'react';
import './HomeMainbar.css';
import { useLocation, useNavigate } from 'react-router-dom';
import QuestionList from './QuestionList';
import { useSelector } from 'react-redux';

const HomeMainbar = () => {
  const location = useLocation();

  const user = useSelector((state) => state.currentUserReducer);
  const navigate = useNavigate();
  const checkAuth = () => {
    if (user === null) {
      alert('Login or signup first to ask question!!');
      navigate('/Auth');
    } else {
      navigate('/AskQuestion');
    }
  };

  const questionsList = useSelector((state) => state.questionsReducer.data);
  const tagList = useSelector((state) => state.tagReducer.data);
  const allTagTitle = tagList?.map((tagObj) => tagObj.tagTitle);
  console.log('All tags at homemainbar', allTagTitle);

  const [showAllTags, setShowAllTags] = useState(false);
  const [input, setInput] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const filteredTags = allTagTitle?.filter(
    (tag) => tag && tag.toLowerCase().includes(input.toLowerCase()) && !selectedTags.includes(tag)
  );
  console.log('Filtered tags', filteredTags);
  console.log('Selected tags', selectedTags);

  const handleFocus = () => {
    console.log('Focused');
    setShowAllTags(true);
  };
  const handleBlur = () => {
    console.log('Blurred');
    setTimeout(() => {
      setShowAllTags(false);
    }, 200);
  };
  const handleTagRemove = (tagTitle) => {
    setSelectedTags(selectedTags.filter((title) => title !== tagTitle));
  };

  const handleTagClick = (tagTitle) => {
    setSelectedTags([...selectedTags, tagTitle]);
    setInput(''); // Clear input after selection
    setShowAllTags(false); // Hide all tags after selection
  };

  let [questionListToDisplay, setQuestionListToDisplay] = useState([]);

  useEffect(() => {
    setQuestionListToDisplay(questionsList);
  }, [questionsList]);

  useEffect(() => {
    if (selectedTags.length > 0) {
      const filteredQuestions = questionsList?.filter((question) =>
        selectedTags.some((tag) => question.questionTags.includes(tag))
      );
      setQuestionListToDisplay(filteredQuestions);
    } else {
      setQuestionListToDisplay(questionsList);
    }
  }, [selectedTags, questionsList]);

  console.log('Question list to display', questionListToDisplay);

  return (
    <div className='main-bar'>
      <div className='main-bar-header'>
        {location.pathname === '/' ? <h1>Top Questions</h1> : <h1>All Questions</h1>}
        <button onClick={checkAuth} className='ask-btn'>Ask Question</button>
      </div>
      <div>
        {questionsList === null ? (
          <h1>Loading....</h1>
        ) : (
          <>
            <p>{questionListToDisplay?.length} Questions</p>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder="Search tags..."
              className="tag-input"
            />

            {showAllTags && (
              <>
                <p>showall tags {filteredTags.length}</p>
                <div className="suggestions">
                  {filteredTags?.length > 0 ? (
                    filteredTags?.map((tag, index) => (
                      <div key={index} onMouseDown={() => handleTagClick(tag)} className="suggestion-item">
                        {tag}
                      </div>
                    ))
                  ) : (
                    <></>
                  )}
                </div>
              </>
            )}

            <h3>Selected Tags:</h3>
            <ul className="selected-tags">
              {selectedTags.map((tagTitle, index) => (
                <li key={index} className="selected-tag">
                  {tagTitle}
                  <span onClick={() => handleTagRemove(tagTitle)} className="remove-tag">&times;</span>
                </li>
              ))}
            </ul>
            {
              
            }
            <>
              <QuestionList questionList={questionListToDisplay || []} />
            </>
          </>
        )}
      </div>
    </div>
  );
};

export default HomeMainbar;
