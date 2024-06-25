import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Questions from '../../components/HomeMainbar/Questions';
import './TagProfile.css';

const TagProfile = () => {
  const tags = useSelector((state) => state.tagReducer.data);
  const { id } = useParams();
  const tag = tags?.filter((tag) => tag._id === id)[0];
  const questionsList = useSelector((state) => (state.questionsReducer.data));
  const [activeSection, setActiveSection] = useState('tagInfo');

  const questionDetails = [];
  for (let qnid of tag?.allQuestions || []) {
    let fnd = questionsList?.find((qn) => (qn._id === qnid));
    if (fnd) questionDetails.push(fnd);
  }

  if (!tag) {
    return (
      <div className="loading-container">
        <h4>Loading.....</h4>
      </div>
    );
  }

  return (
    <div className="tag-profile-container">
      <header className="tag-profile-header">
        <button
          className={activeSection === 'tagInfo' ? 'active' : ''}
          onClick={() => setActiveSection('tagInfo')}
        >
          Tag Info
        </button>
        <button
          className={activeSection === 'questions' ? 'active' : ''}
          onClick={() => setActiveSection('questions')}
        >
          Questions
        </button>
      </header>
      <div className="tag-profile-content">
        {activeSection === 'tagInfo' && (
          <>
            <h2>Tag Profile</h2>
            <p><strong>Title:</strong> {tag.tagTitle}</p>
            <p><strong>Description:</strong> {tag.tagDescription}</p>
            <p><strong>Created On:</strong> {new Date(tag.createdOn).toLocaleDateString()}</p>
          </>
        )}
        {activeSection === 'questions' && (
          <>
            <h2>Questions</h2>
            {questionDetails.length === 0 ? (
              <p>No questions found for this tag.</p>
            ) : (
              questionDetails.map((qnobj, idx) => (
                <Questions key={idx} question={qnobj} questionid={qnobj?._id} />
              ))
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default TagProfile;
