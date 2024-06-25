import React, { useState, useEffect } from 'react';
import Profile from './Profile';
import SavedQuestions from './SavedQuestions';
import PostedQuestions from './PostedQuestions';
import { useSelector } from 'react-redux';
import './ProfileBio.css';

const ProfileBio = ({ currentProfile, currentUser }) => {
  const [activeSection, setActiveSection] = useState('profile');
  const [havetoShow, setHaveToShow] = useState(false);

  const questionsList = useSelector((state) => state.questionsReducer.data);

  useEffect(() => {
    if (currentProfile?._id === currentUser?.result?._id) {
      setHaveToShow(true);
    } else {
      setHaveToShow(false); // Reset when condition is not met
    }
  }, [currentProfile, currentUser]);

  const postedQuestions = questionsList?.filter(
    (question) => question.userId === currentProfile?._id
  );

  return (
    <div className="profile-bio-container">
      <header className="profile-bio-header">
        <button
          className={activeSection === 'profile' ? 'active' : ''}
          onClick={() => setActiveSection('profile')}
        >
          Profile
        </button>
        <button
          className={activeSection === 'postedQuestions' ? 'active' : ''}
          onClick={() => setActiveSection('postedQuestions')}
        >
          Posted Questions
        </button>
        {
            havetoShow && 
            <button
            className={activeSection === 'savedQuestions' ? 'active' : ''}
            onClick={() => setActiveSection('savedQuestions')}
            disabled={!havetoShow} // Disable button if havetoShow is false
            >
            Saved Questions
            </button>
        }
      </header>
      <div className="profile-bio-content">
        {activeSection === 'profile' && <Profile />}
        {activeSection === 'postedQuestions' && <PostedQuestions postedQuestions={postedQuestions} />}
        {activeSection === 'savedQuestions' && havetoShow && (
          <SavedQuestions savedQuestions={currentUser?.result?.savedQuestions} />
        )}
      </div>
    </div>
  );
};

export default ProfileBio;
