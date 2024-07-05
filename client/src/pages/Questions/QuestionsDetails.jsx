/*This file is to display individual question with upvotes and downvotes and alreasy answered to that question and form for replay to question and all */

import React, { useDebugValue, useEffect } from 'react'

import './Questions.css'


/* to extract id from url */
import { useParams, Link, useNavigate, useResolvedPath } from 'react-router-dom';
import upvotes from '../../assets/upvotes.png'
import downvotes from '../../assets/downvotes.png'
import Avatar from '../../components/Avatar/Avatar';
import DisplayAnswer from './DisplayAnswer';
import { useSelector } from 'react-redux';

//for posting answer for question
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { bookmarkQuestion, postAnswer } from '../../actions/question';

//this is for modification in time
import moment from "moment"

//for share button
import copy from "copy-to-clipboard"
import { useLocation } from 'react-router-dom';

//for deleting question
import { deleteQuestion } from '../../actions/question';


//for up and down votes
import { voteQuestion } from '../../actions/question';
import Vote from '../../components/Common/Vote';


import Bookmark from '../../components/Common/bookmark/Bookmark';






const QuestionsDetails = () => {



    const {id}=useParams(); /* this will extract id from url */

    //instead of hard coding we have to fetch from redux store
    const questionsList=useSelector(state=>state.questionsReducer);
    const allUsers=useSelector((state)=>(state.usersReducer));//retriving User value from REDUX
    console.log("All users",allUsers);
    const curUser=useSelector((state)=>(state.currentUserReducer));
    console.log("curUser",curUser)
    const User=allUsers?.find((user)=>(user?._id === curUser?.result?._id)) || null;
    console.log("Current user that have logged in ",User);
    //code for upvoting and downvoting
    const curQuestion=questionsList?.data?.find(question => question?._id === id);
    const curQuestionUpVoteList=curQuestion?.upVote;
    const curQuestionDownVoteList=curQuestion?.downVote;
    console.log("all upVotes that current question have",curQuestionUpVoteList)
    console.log("all downVote that current question have",curQuestionDownVoteList)
    console.log("current logged user id",User?._id);
    //there are three cases 
    //1) current user have upvoted
    //2) current user have downvoted
    //3) current user have not upvoted nor downvoted 

    //1) type-> upVote isFilled=true and type->downVote isFilled=false
    //2) type-> upVote isFilled=false and type->downVote isFilled=true
    //3) type-> upVote isFilled=false and type->downVote isFilled=false
    
    const [haveUpVoted,setHaveUpVoted]=useState(false)
    const [haveDownVoted,setHaveDownVoted]=useState(false)

    //⚡below both line will cause infinite rendering
    // setHaveUpVoted(curQuestionUpVoteList?.includes(User?.result?._id));
    // setHaveDownVoted(curQuestionDownVoteList?.includes(User?.result?._id));
    
    useEffect(()=>{
        setHaveUpVoted(curQuestionUpVoteList?.includes(User?._id));
        setHaveDownVoted(curQuestionDownVoteList?.includes(User?._id));
    },[curQuestionUpVoteList,curQuestionDownVoteList,User])

    console.log("have upvoted",haveUpVoted,"have downvoted",haveDownVoted);
    
    const [Answer,setAnswer]=useState("");
    const Navigate=useNavigate(); 
    const dispatch=useDispatch();
    const tagList=useSelector((state)=>(state.tagReducer.data));


    console.log("all questions",questionsList);
    console.log("all tags",tagList);

        let fndqn=questionsList?.data?.find( question=>question?._id === id);//here questionList.data?.data is important because if you not do that and you reload then it will through an error that .find is not function on null
        console.log("fnd ",fndqn);

        const allTags=fndqn?.questionTags || [];
        const allTagsDetails=[]
        for(let tag of allTags){
            let fndtg=tagList?.find((tagith)=>(tagith.tagTitle === tag))
            // allTagsDetails.push({fnd._id,fnd.tagTitle});
            console.log("tag found with tag as ",tag," is ",fndtg);
            if(!fndtg){//here write a query for those quenstion for that not present in tags collection her i am simply making static entry for those => _id will be "" and tagTitle will be tag
                allTagsDetails.push({
                    _id:"",
                    tagTitle:tag
                });

            }
            else
            allTagsDetails.push(fndtg);
        }


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
                dispatch(postAnswer({ id, noOfAnswers: answerLength + 1 , answerBody: Answer , userAnswered: User.name, userId: User?._id}));
            }
        } 
    }




    //this is for sharing given question i.e. implementing functionallity of share button

    const location =useLocation();
    // console.log(location);//we can see in console like there is property as "pathname" which gives current url of page
    const url="https://doubt-resolver.netlify.app";//base url for frontend deployment
    // const url="http://localhost:3000";//base url without deploying
    const handleShare = ()=>{
        copy(url+location.pathname);
        alert("Url copied : "+url+location.pathname);
    }



    //this is fo deleting question 
    const handleDelete = ()=>{
        dispatch(deleteQuestion(id,Navigate));
    }


    //this is for handling up and down votes
    const [upVoting,setUpVoting]=useState(false);
    const [downVoting,setDownVoting]=useState(false);
    const handleUpVote = (e) => {
        e.preventDefault();
        if (User === null) {
            alert("Login or sign Up to answer question");
            Navigate("/Auth");
            return;
        }
        setUpVoting(true); // Set upvoting state to true immediately
        dispatch(voteQuestion(id, "upVote", User?._id))
            .then(async () => {
                setHaveUpVoted(!haveUpVoted); // Update upvoted state after successful vote
                setUpVoting(false)
            })
            .catch((error) => {
                console.error("Error while upvoting:", error);
                setUpVoting(false); // Reset upvoting state on error
            });
    }
    
    const handleDownVote = (e) => {
        e.preventDefault();
        if (User === null) {
            alert("Login or sign Up to answer question");
            Navigate("/Auth");
            return;
        }
        setDownVoting(true); // Set downvoting state to true immediately
        dispatch(voteQuestion(id, "downVote", User?._id))
            .then(() => {
                setHaveDownVoted(!haveDownVoted)
                setDownVoting(false); // Reset downvoting state after vote is completed
            })
            .catch((error) => {
                console.error("Error while downvoting:", error);
                setDownVoting(false); // Reset downvoting state on error
            });
    }
    
    const [isBookmarked,setIsBookmarked]=useState(false);
    console.log("all bookmarked by this user",User);

    useEffect(()=>{
        setIsBookmarked(User?.savedQuestions?.includes(id));    
        console.log("in userEffect",User);
    },[User,id]);
    console.log("here in question details file",isBookmarked)
    const handleSaveQuestion=(e)=>{
        e.preventDefault();
        if(User === null){
            alert("Login or Sign Up to bookmark");
            Navigate("/Auth");
            return;
        }
        const userId=User?._id;
        const questionId=id;
        console.log("data send to backend",userId,questionId);
        dispatch(bookmarkQuestion(userId,questionId))
        setIsBookmarked(!isBookmarked);
        
    }
    

  return (
    <div className='question-details-page'>
        {
            questionsList?.data === null ?
            <h1>Loading...</h1>:
            <>
                {
                    /* if any id of our questoinList matches with id extracted then we will return it */
                    questionsList?.data.filter(question => question?._id === id).map(question =>(
                        <div key={question?._id}>
                            <section className='question-details-container'>
                                <h1>{question.questionTitle}</h1>
                                <div className="question-details-container-2">
                                    <div className="question-votes">
                                        <div className="vote-container" onClick={handleUpVote}>
                                            <Vote type="upVote" isFilled={haveUpVoted} />
                                        </div>
                                        <div className="vote-count">
                                            {upVoting ? <p className="voting-status">Upvoting...</p> :
                                                downVoting ? <p className="voting-status">Downvoting...</p> :
                                                <p className="vote-number">{question?.upVote.length - question?.downVote.length}</p>
                                            }
                                        </div>
                                        <div className="vote-container" onClick={handleDownVote}>
                                            <Vote type="downVote" isFilled={haveDownVoted} />
                                        </div>
                                        <div className="bookmark-container">
                                        <p className="bookmark-text">Bookmark</p>
                                        <div className="bookmark-icon" onClick={handleSaveQuestion}>
                                            <Bookmark isBookmarked={isBookmarked}/>                     
                                        </div>
                                    </div>
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
                                                    <button type='button' onClick={handleShare} >Share</button>
                                                    {/* to delete question first we need to display delete button so if userposted matches with user who have login then we can show delete button and we can delete question  */}
                                                    {( (User?.result?._id) === (question?.userId ))  && (<button type='button' onClick={handleDelete}>Delete</button>)}
                                                    

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
                                        <DisplayAnswer key={question?._id} question={question} handleShare={handleShare}/>
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
                                        allTagsDetails?.map((tag)=>(
                                            <Link to={`/Tags/${tag?._id}`} ley={tag.tagTitle} className='ans-tags'> {tag.tagTitle} </Link>
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