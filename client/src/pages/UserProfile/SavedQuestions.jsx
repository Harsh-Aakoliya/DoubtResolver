import React from 'react'
import { useSelector } from 'react-redux'
import Questions from '../../components/HomeMainbar/Questions';
import { Link } from 'react-router-dom';
function SavedQuestions({savedQuestions}) {
  console.log("saved Questoins",savedQuestions);
  const questionsList=useSelector((state)=>(state.questionsReducer.data));
  const savedQuestionsDetails=[];
  for(let savedqn of savedQuestions){
    const fnd=questionsList?.find((qn)=>(qn._id === savedqn));
    savedQuestionsDetails.push(fnd);
  }
  return (
    <div>
      SavedQuestions

      {
          savedQuestionsDetails.length ?
           savedQuestionsDetails.map((qn,idx)=> <Questions key={idx} question={qn}/>):
           <p><strong/> Explore the <Link to="/Questions">Question</Link> and save it for letter</p>
      }
    </div>
  )
}

export default SavedQuestions