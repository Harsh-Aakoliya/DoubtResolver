import React from 'react'
import Questions from '../../components/HomeMainbar/Questions'
function PostedQuestions({postedQuestions}) {
    console.log("postedquestions are",postedQuestions);
  return (
    <div>
       <h3>
        Your Posted Questions
       </h3>
       {
           postedQuestions.map((qn,idx)=> <Questions key={idx} question={qn}/>)
       }
    </div>
  )
}

export default PostedQuestions