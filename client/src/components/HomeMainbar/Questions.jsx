/*This is for individual question */
import { Link } from 'react-router-dom'
import React from 'react'
const Questions = ({question}) => {
  return (
    <div className='display-question-container'>
        <div className='display-votes-ans'>
            <p >{question.upVotes-question.downVotes}</p>
            <p >votes</p>
        </div>
        <div className='display-votes-ans'>
            <p >{question.noOfAnswer}</p>
            <p >answers</p>
        </div>
        <div className="display-question-details">
             {/* for every answered question we have seprate route */}
             <Link to={`/Question/${question._id}`} className='question-title-link'>{question.questionTitle}</Link>
             <div className="display-tags-time">
                <div className="display-tags">
                  {
                    question.questionTags.map((tag)=>(
                      <p key={tag}>{tag}</p>
                    ))
                  }
                </div>
                <p className="display-time">
                  asked {question.askedOn} {question.userPosted}
                </p>
             </div>
        </div>

    </div>
  )
}
export default Questions