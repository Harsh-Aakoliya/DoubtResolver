/*This file is to display individual question with upvotes and downvotes and alreasy answered to that question and form for replay to question and all */

import React from 'react'

import './Questions.css'


/* to extract id from url */
import { useParams, Link } from 'react-router-dom';
import upvotes from '../../assets/upvotes.png'
import downvotes from '../../assets/downvotes.png'
import Avatar from '../../components/Avatar/Avatar';
import DisplayAnswer from './DisplayAnswer';
const QuestionDetails = () => {
    const questionsList=[
        {
          _id:'1',
          upVotes:3,
          downVotes:2,
          noOfAnswer:4,
          questionTitle:"what is function",
          questionBody: "It means to be",
          questionTags:["java","c++","c"],
          userPosted:"mano1",
          userId:101,
          askedOn:"jan 1",
          answer:[{
            answerBody: "Answer is somethid;akjsdf",
            userAnswered:"Harsh1",
            answeredOn:"jan 2",
            userId:11
          }]
        },
        {
          _id:'2',
          upVotes:3,
          downVotes:90,
          noOfAnswer:4,
          questionTitle:"what is function",
          questionBody: "It means to be",
          questionTags:["java","c++","c"],
          userPosted:"mano2",
          userId:102,
          askedOn:"jan 1",
          answer:[{
            answerBody: "Answer",
            userAnswered:"Harsh2",
            answeredOn:"jan 2",
            userId:12
          }]
        },
        {
          _id:'3',
          upVotes:3,
          downVotes:2,
          noOfAnswer:4,
          questionTitle:"what is function",
          questionBody: "It means to be",
          questionTags:["java","c++","c"],
          userPosted:"mano3",
          userId:103,
          askedOn:"jan 1",
          answer:[{
            answerBody: "Answer",
            userAnswered:"Harsh3",
            answeredOn:"jan 2",
            userId:13
          }]
        }
      ];
      const {id}=useParams(); /* this will extract id from url */
  return (
    <div className='question-details-page'>
        {
            questionsList === null ?
            <h1>Loading...</h1>:
            <>
                {
                    /* if any id of our questoinList matches with id extracted then we will return it */
                    questionsList.filter(question => question._id === id).map(question =>(
                        <div key={question._id}>
                            <section className='question-details-container'>
                                <h1>{question.questionTitle}</h1>
                                <div className="question-details-container-2">
                                    <div className="question-votes">
                                        <img src={upvotes} alt='upvotes' width='18' className='votes-icon'/>
                                        <p>{question.upVotes - question.downVotes}</p>
                                        <img src={downvotes} alt='downvotes' width='18' className='votes-icon'/>
                                    </div>

                                    <div style={{width:"100%"}} >
                                        <p className='question-body'>{question.questionBody}</p>
                                        <div className="question-details-tags">
                                            {
                                                question.questionTags.map((tag)=>(
                                                    <p key={tag}>{tag}</p>
                                                ))
                                            }
                                        </div>
                                            <div className="question-actions-user">
                                                <div>
                                                    <button type='button'>Shares</button>
                                                    <button type='button'>Delete</button>
                                                </div>
                                                <div>
                                                    <p>AskedOn {question.askedOn}</p>
                                                    <Link to={`/User/${question.userId}`} className='user-link' style={{color:"#0086d8"}}>
                                                        <Avatar backgroundColor="orange" px="8px" py="5px" >{question.userPosted.charAt(0).toUpperCase()}</Avatar>
                                                        <div>
                                                            {question.userPosted}
                                                        </div>
                                                    </Link>
                                            </div>
                                        </div>
                        
                                    </div>



                                </div>
                            </section>
                            

                            {/* this part is to display all the replays that question has */}
                            {
                                question.noOfAnswer !== 0 && (
                                    <section>
                                        <h3>
                                            {question.noOfAnswer} Answers
                                        </h3>
                                        <DisplayAnswer key={question._id} question={question}/>
                                    </section>
                                )
                            }


                            {/* this is to post answer of given question  */}

                            <section className="post-ans-container">'
                                <h3>Your Answer</h3>
                                <form>
                                    <textarea name="" id="" cols="30" rows="10"></textarea> <br />
                                    <input type="submit" className='post-ans-btn' value='Post Your Answer'/>

                                </form>

                                <p>
                                    Browse Other Questions tagged
                                    {
                                        question.questionTags.map((tag)=>(
                                            <Link to='/Tags' ley={tag} className='ans-tags'> {tag} </Link>
                                        ))
                                    }
                                    or
                                    <Link to='AskQuestion' style={{textDecoration:"none", color:"#009bff"}}> Ask Your Own Question</Link>
                                </p>
                            </section>
                        </div>
                    ))
                }
            </>
        }
         
    </div>
  )
}

export default QuestionDetails