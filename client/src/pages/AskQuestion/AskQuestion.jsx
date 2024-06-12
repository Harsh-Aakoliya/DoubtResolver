import React,{useState} from 'react'
import  { useDispatch,useSelector }  from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {askQuestion} from "../../actions/question"
import './AskQuestion.css'
const AskQuestion = () => {
    
  const [questionTitle,setQuestionTitle]=useState("");
  const [questionBody,setQuestionBody]=useState("");
  const [questionTags,setQuestionTags]=useState("");
  const [curtag,setCurTag]=useState("");
  const [alltaglst,setAllTagLst]=useState([]);


  const dispatch=useDispatch();
  const User=useSelector((state)=>(state.currentUserReducer));//we got which user currently loged in 
  const navigate=useNavigate();

  const handleSubmit=(e)=>{
    e.preventDefault();
    // console.log({questionTitle,questionBody,questionTags});
    // dispatch(askQuestion({questionTitle,questionBody,questionTags,userPosted: User.result.name, userId:User?.result?._id},navigate)) //at the time of dispatching we need an action here it is in question.js of action folder here for parameter as userId : User?.result?._id we can also use userId : User.result._id 
    dispatch(askQuestion({questionTitle,questionBody,questionTags:alltaglst,userPosted: User.result.name, userId:User?.result?._id},navigate)) //at the time of dispatching we need an action here it is in question.js of action folder here for parameter as userId : User?.result?._id we can also use userId : User.result._id 

  }
  const handleEnter=(e)=>{
    if(e.key === "Enter"){
        setQuestionBody(questionBody+"\n");
    }
  }

  const handelTagAddSubmit=()=>{
    if(curtag===''){
        alert("Plaese write any tag");
        return;
    }
    setAllTagLst(oldalltaglst=>[...oldalltaglst,curtag]);
    setCurTag("");
  }

  return (
       <div className="ask-question">
            <div className="ask-ques-container">
                <h1>Ask a public Question</h1>
                <form onSubmit={handleSubmit}>
                    <div className="ask-form-container">
                        <label htmlFor="ask-ques-title">
                            <h4> Title</h4>
                            <p>Be specific because you are asking question to another person</p>
                            <input type='text' id='ask-ques-title' placeholder='e.g. Question no 1' onChange={(event)=>{setQuestionTitle(event.target.value)}}/>
                        </label>

                        <label htmlFor="ask-ques-body">
                            <h4> Body</h4>
                            <p>include all the information that you have</p>
                            <textarea name="" id="ask-ques-body" cols="30" rows="10" onChange={(event)=>{setQuestionBody(event.target.value)}} onKeyDown={handleEnter}></textarea>
                        </label>
 
                        <label htmlFor="ask-ques-tags">
                            <h4> Title</h4>
                            <p>Add upto 5 tags to enhance result</p>
                            {/* <input type='text' id='ask-ques-tags' placeholder='e.g. java c html' onChange={(event)=>{setQuestionTags(event.target.value.split(" "))}}/> */}
                            
                            <input type='input' id='ask-ques-tags' placeholder='Enter your tag' value={`${curtag===''?"":`${curtag}`}`} onChange={(e)=>{setCurTag(e.target.value);}}/> 
                            <button type="button" onClick={()=>{handelTagAddSubmit()}}>Add</button>
                            
                            {alltaglst.length}
                            <div>{alltaglst.map(entry =>
                            <div>{entry}</div>
                            )}
                            </div>




                        </label>
                    </div>
                    <input type='submit' value='Review your question' className='review-btn'/>
                </form>

            </div>
       </div>
    
  )
}

export default AskQuestion