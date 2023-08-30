import React from 'react'
import './HomeMainbar.css'
import {Link,useLocation,useNavigate} from 'react-router-dom'
import QuestionList from './QuestionList';
const HomeMainbar = () => {


  /* for checking user is loged in or not. if not then if user click on askquestion button then he/she must navigate to /Auth page else he/she will navigate to 'AskQuestion' page */
    const user=12121;
    const navigate=useNavigate();
    const checkAuth=()=>{
      if(user===null){
        alert("login or signup first to ask question!!");
         navigate('/Auth');  
      }
      else{
        navigate('/AskQuestion');
      }
      
    }


  const questionsList=[
  {
    _id:1,
    upVotes:3,
    downVotes:2,
    noOfAnswer:4,
    questionTitle:"what is function",
    questionBody: "It means to be",
    questionTags:["java","c++","c"],
    userPosted:"mano",
    userId:1,
    askedOn:"jan 1",
    answer:[{
      answerBody: "Answer",
      userAnswered:"Harsh1",
      answeredOn:"jan 2",
      userId:11
    }]
  },
  {
    _id:2,
    upVotes:3,
    downVotes:90,
    noOfAnswer:4,
    questionTitle:"what is function",
    questionBody: "It means to be",
    questionTags:["java","c++","c"],
    userPosted:"mano",
    userId:1,
    askedOn:"jan 1",
    answer:[{
      answerBody: "Answer",
      userAnswered:"Harsh1",
      answeredOn:"jan 2",
      userId:11
    }]
  },
  {
    _id:3,
    upVotes:3,
    downVotes:2,
    noOfAnswer:4,
    questionTitle:"what is function",
    questionBody: "It means to be",
    questionTags:["java","c++","c"],
    userPosted:"mano",
    userId:1,
    askedOn:"jan 1",
    answer:[{
      answerBody: "Answer",
      userAnswered:"Harsh1",
      answeredOn:"jan 2",
      userId:11
    }]
  }
];

/* here below location is an object which has one property as pathname */
const location=useLocation();
  return (
    <div className='main-bar'>
      <div className='main-bar-header'>
        {
          location.pathname==='/' ? <h1> Top Questions </h1> : <h1>All Questions</h1>
        }
        <button onClick={checkAuth} className='ask-btn'> Ask Question </button>
      </div>
      <div>
        {
          /* At the time of featching data from backend it may take time to load question to questionList so at that time questionList will be empty so we need to display Loading... */
          questionsList===null ?
          <h1>Loading....</h1> :
          <>
            <p>{questionsList.length} Questions </p>
              <>
                <QuestionList questionList={questionsList} />
              </>
          </>
        }
      </div>
    </div>
  )
}

export default HomeMainbar