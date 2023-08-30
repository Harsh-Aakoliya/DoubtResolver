/* This is for all the Question that are in our list */

import React from 'react'
import Questions from './Questions';

const QuestionList = ({questionList}) => {
  return (
    <>
    {
        questionList.map((question)=>{
            return <Questions question={question} questionid={question.id}/>
        })
    }
    </>
  )
}

export default QuestionList