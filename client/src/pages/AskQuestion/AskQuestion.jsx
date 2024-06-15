import React,{useState} from 'react'
import  {  useDispatch,useSelector }  from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {askQuestion} from "../../actions/question"
import { fetchAllTags, postNewTags } from '../../actions/tags'
import Tags from '../../components/Tags/Tags'
import './AskQuestion.css'
const AskQuestion = () => {
    
  const [questionTitle,setQuestionTitle]=useState("");
  const [questionBody,setQuestionBody]=useState("");
  const [questionTags,setQuestionTags]=useState("");
  const [curtag,setCurTag]=useState("");
  
  const [selectedTags, setSelectedTags] = useState([]);
  const [createdTags, setCreatedTags] = useState([]);
  // const 

  const dispatch=useDispatch();
  const User=useSelector((state)=>(state.currentUserReducer));//we got which user currently loged in 
  const tagList=useSelector((state)=>(state.tagReducer));
  console.log("all the tags in askquestoin ",tagList);
  const navigate=useNavigate();

  const handleSubmit=async(e)=>{
    e.preventDefault();

    console.log("selected tags",selectedTags);
    console.log("created tags",createdTags);
    // console.log({questionTitle,questionBody,questionTags});
    // dispatch(askQuestion({questionTitle,questionBody,questionTags,userPosted: User.result.name, userId:User?.result?._id},navigate)) //at the time of dispatching we need an action here it is in question.js of action folder here for parameter as userId : User?.result?._id we can also use userId : User.result._id 
    
    
    let alltags=tagList
    .filter(tag => selectedTags.includes(tag._id))
    .map(tag => tag.tagTitle);
    for(let i in createdTags){
      alltags.push(createdTags[i].tagTitle);
    }
    console.log("All the tags",alltags);
    dispatch(askQuestion({questionTitle,questionBody,questionTags:alltags,userPosted: User.result.name, userId:User?.result?._id},navigate)) //at the time of dispatching we need an action here it is in question.js of action folder here for parameter as userId : User?.result?._id we can also use userId : User.result._id 
    
    
    console.log("pushed new question to database")
    for(let i in createdTags){
      dispatch(postNewTags(createdTags[i]));
    }
    console.log("pushed all the new tags to database");



    dispatch(fetchAllTags());
    console.log("after pushing the question now i have dispatched all the tags"); 

  }
  const handleEnter=(e)=>{
    if(e.key === "Enter"){
        setQuestionBody(questionBody+"\n");
    }
  }

  // const handelTagAddSubmit=()=>{
  //   if(curtag===''){
  //       alert("Plaese write any tag");
  //       return;
  //   }
    
  //   // setAllTagLst(oldalltaglst=>[...oldalltaglst,curtag]);
  //   // setCurTag("");
  // }

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
                            
                            <Tags selectedTags={selectedTags} createdTags={createdTags} setSelectedTags={setSelectedTags} setCreatedTags={setCreatedTags} tagList={tagList}/>

                        </label>
                    </div>
                    <input type='submit' value='Review your question' className='review-btn'/>
                </form>

            </div>
       </div>
    
  )
}

export default AskQuestion