/*This is for individual question */
import { Link } from 'react-router-dom'
import React from 'react'


//for time 
import moment from "moment";



const Questions = ({question}) => {
  return (
    <div className='display-question-container'>
        <div className='display-votes-ans'>
          {/* here we have used .legth because in schema of upvotes it is array  */}
            <p >{question.upVote.length-question.downVote.length}</p> 
            <p >votes</p>
        </div>
        <div className='display-votes-ans'>
            <p >{question.noOfAnswers}</p>
            <p >answers</p>
        </div>
        <div className="display-question-details">
             {/* for every answered question we have seprate route */}
             <Link to={`/Questions/${question._id}`} className='question-title-link'>{question.questionTitle}</Link>
             <div className="display-tags-time">
                <div className="display-tags">
                  {
                    question.questionTags.map((tag)=>(
                      <p key={tag}>{tag}</p>
                    ))
                  }
                </div>
                <p className="display-time">
                  asked {moment(question.askedOn).fromNow()} {question.userPosted}
                </p>
             </div>
        </div>

    </div>
  )
}
export default Questions