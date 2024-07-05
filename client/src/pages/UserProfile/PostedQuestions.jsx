import React from 'react'
import Questions from '../../components/HomeMainbar/Questions'
import { Link } from 'react-router-dom';
function PostedQuestions({postedQuestions}) {
    console.log("postedquestions are",postedQuestions);
    return (
      <div>
        <h3>Your Posted Questions</h3>
        {
          postedQuestions.length === 0 ? (
            <p><strong/><Link to="/AskQuestion"> Ask your </Link>first question and save it for letter</p>
          ) : (
            postedQuestions.map((qn, idx) => <Questions key={idx} question={qn} />)
          )
        }
      </div>
    );
    
}

export default PostedQuestions