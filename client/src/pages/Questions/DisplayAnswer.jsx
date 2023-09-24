import React from 'react'
import QuestionsDetails from './QuestionsDetails'
import {Link} from 'react-router-dom'
import Avatar from '../../components/Avatar/Avatar'
import moment  from 'moment'

//for deleting answer
import { useDispatch, useSelector } from 'react-redux'
import { deleteAnswer } from '../../actions/question'
import {useParams} from "react-router-dom"
const DisplayAnswer = ({question,handleShare}) => {


    //retriving who is logein 
    const User=useSelector((state)=> (state.currentUserReducer));//retriving User value from REDUX

    
    //for deleting answer
    const {id}=useParams();
    const dispatch=useDispatch();
    const handleDelete=(answerId,noOfAnswers)=>{
        // deleteAnswer has parameter as question id which we are getting using useparams answerId and noOfAnswer that we need to set

        dispatch(deleteAnswer(id,answerId,noOfAnswers-1));
    }

  return (
    <div>
        {
            question.answer.map((ans)=>(
                <div className="display-ans" key={ans._id}>
                    <p>{ans.answerBody}</p>
                    <div className="question-actions-user">
                        <div>
                            <button type='button' onClick={handleShare}>Share</button>
                            {/* if logedin user is same as that answer that we want to delete */}
                            {
                                User?.result?._id === ans?.userId && ( <button type='button' onClick={()=>handleDelete(ans._id,question.noOfAnswers)}>Delete</button> )
                            }
                        </div>  
                        <div>
                            <p> Answered {moment(ans.answeredOn).fromNow()}</p>
                            <Link to={`/Users/${ans.userId}`} className='user-link' style={{color:"#0086d8"}}>
                                <Avatar backgroundColor="green" px="8px" py="5px" >{ans.userAnswered.charAt(0).toUpperCase()}</Avatar>
                                <div>{ans.userAnswered}</div>
                            </Link>
                        </div>
                    </div>
                </div>
            ))
        }
    </div>
  )
}

export default DisplayAnswer