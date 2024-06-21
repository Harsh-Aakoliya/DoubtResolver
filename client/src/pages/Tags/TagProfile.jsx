import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Questions from '../../components/HomeMainbar/Questions';
import './TagProfile.css';

const TagProfile = () => {
    const tags = useSelector((state) => state.tagReducer.data);

    console.log("All the tags in TagProfile", tags);

    
    const { id } = useParams();
    console.log("ID of tag that you want to see its profile", id);
    
    const tag = tags?.filter((tag) => tag._id === id)[0];
    console.log("tag at line 16",tag);


    const questionsList=useSelector((state)=>(state.questionsReducer.data));
    console.log("all question ",questionsList);
    const questionDetails=[]
    console.log("tag.allquesitons",tag?.allQuestions);
    for(let qnid of tag?.allQuestions || []){
        let fnd=questionsList?.find((qn)=>(qn._id === qnid));
        if(fnd) questionDetails.push(fnd);
    }

    console.log("questionDetails",questionDetails);
    
    
    
    
    // Check if tag is undefined
    if (!tag) {
        return (
            <div className="loading-container">
                <h4>Loading.....</h4>
            </div>
        );
    }
    console.log(tag);
    return (
        <div className="tag-profile-container">
            <h2>Tag Profile</h2>
            {/* <p><strong>ID:</strong> {tag._id}</p> */}
            <p><strong>Title:</strong> {tag.tagTitle}</p>
            <p><strong>Description:</strong> {tag.tagDescription}</p>
            <p><strong>Created On:</strong> {new Date(tag.createdOn).toLocaleDateString()}</p>
            {/* <p><strong>QuestionList </strong> {
                tag.allQuestions.map((qnid)=><h1>{qnid}</h1>)
            }</p> */}

            {
                !tag ? <div>Loading all the questions</div>:
                <>
                    {
                        questionDetails?.map((qnobj,idx)=>

                            <Questions key={idx} question={qnobj} questionid={qnobj?._id}/>
                        )
                    }
                </>
            }



        </div>
    );
}

export default TagProfile;