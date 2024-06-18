/*This file is to display individual question with upvotes and downvotes and alreasy answered to that question and form for replay to question and all */

import React from 'react'

import './Questions.css'


/* to extract id from url */
import { useParams, Link, useNavigate } from 'react-router-dom';
import upvotes from '../../assets/upvotes.png'
import downvotes from '../../assets/downvotes.png'
import Avatar from '../../components/Avatar/Avatar';
import DisplayAnswer from './DisplayAnswer';
import { useSelector } from 'react-redux';

//for posting answer for question
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postAnswer } from '../../actions/question';

//this is for modification in time
import moment from "moment"

//for share button
import copy from "copy-to-clipboard"
import { useLocation } from 'react-router-dom';

//for deleting question
import { deleteQuestion } from '../../actions/question';


//for up and down votes
import { voteQuestion } from '../../actions/question';





const QuestionsDetails = () => {



    const {id}=useParams(); /* this will extract id from url */

    //instead of hard coding we have to fetch from redux store
    const questionsList=useSelector(state=>state.questionsReducer);


    const [Answer,setAnswer]=useState("");
    const Navigate=useNavigate(); 
    const dispatch=useDispatch();
    const User=useSelector((state)=> (state.currentUserReducer));//retriving User value from REDUX
    const handlePostAns=(e,answerLength)=>{
        e.preventDefault();
        if(User === null){
            alert("Login or sign Up to answer question");
            Navigate("/Auth");
        }
        else{
            if(Answer === ""){
                alert("Enter answer before submitting");
            }
            else{
                //calling function of action folder of question.js of postAnser() to do specific action on submitting
                dispatch(postAnswer({ id, noOfAnswers: answerLength + 1 , answerBody: Answer , userAnswered: User.result.name, userId: User.result._id}));
            }
        } 
    }




    //this is for sharing given question i.e. implementing functionallity of share button

    const location =useLocation();
    // console.log(location);//we can see in console like there is property as "pathname" which gives current url of page
    // const url="https://doubt-resolver.netlify.app";//base url for frontend deployment
    const url="http://localhost:3000";//base url without deploying
    const handleShare = ()=>{
        copy(url+location.pathname);
        alert("Url copied : "+url+location.pathname);
    }



    //this is fo deleting question 
    const handleDelete = ()=>{
        dispatch(deleteQuestion(id,Navigate));
    }


    //this is for handling up and down votes

    const handleUpVote =(e)=>{
        e.preventDefault();
        if(User === null){
            alert("Login or sign Up to answer question");
            Navigate("/Auth");
        }
        else dispatch(voteQuestion(id,"upVote",User.result._id));
    }
    const handleDownVote =(e)=>{
        e.preventDefault();
        if(User === null){
            alert("Login or sign Up to answer question");
            Navigate("/Auth");
        }
        else dispatch(voteQuestion(id,"downVote",User.result._id));
    }


  return (
    <div className='question-details-page'>
        {
            questionsList.data === null ?
            <h1>Loading...</h1>:
            <>
                {
                    /* if any id of our questoinList matches with id extracted then we will return it */
                    questionsList.data.filter(question => question._id === id).map(question =>(
                        <div key={question._id}>
                            <section className='question-details-container'>
                                <h1>{question.questionTitle}</h1>
                                <div className="question-details-container-2">
                                    <div className="question-votes">
                                        <img src={upvotes} alt='upvotes' width='18' className='votes-icon' onClick={handleUpVote}/>
                                        <p>{question.upVote.length - question.downVote.length}</p>
                                        <img src={downvotes} alt='downvotes' width='18' className='votes-icon' onClick={handleDownVote}/>
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
                                                    <button type='button' onClick={handleShare}>Share</button>
                                                    {/* to delete question first we need to display delete button so if userposted matches with user who have login then we can show delete button and we can delete question  */}
                                                    {( (User?.result?._id) === (question?.userId ))  && (<button type='button' onClick={handleDelete}>Delete</button>)}
                                                    {/* <h6>{User?.result?._id}</h6>
                                                    <br />
                                                    <h6>{question?.userId}</h6> */}
                                                </div>
                                                <div>
                                                    <p>AskedOn {moment(question.askedOn).fromNow()}</p>
                                                    <Link to={`/Users/${question.userId}`} className='user-link' style={{color:"#0086d8"}}>
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
                                            {question.noOfAnswers} Answers
                                        </h3>
                                        <DisplayAnswer key={question._id} question={question} handleShare={handleShare}/>
                                    </section>
                                )
                            }


                            {/* this is to post answer of given question  */}

                            <section className="post-ans-container">
                                <h3>Your Answer</h3> 
                                <form onSubmit={ (e) => {handlePostAns( e , question.answer.length)}}>
                                    <textarea name="" id="" cols="30" rows="10" onChange={ e => setAnswer(e.target.value)}></textarea> <br />
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
                                    <Link to='/AskQuestion' style={{textDecoration:"none", color:"#009bff"}}> Ask Your Own Question</Link>
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

export default QuestionsDetails;