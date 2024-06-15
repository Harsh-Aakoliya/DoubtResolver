//this will be for particular user 
import React from 'react'
import { Link, useParams } from 'react-router-dom'

const TagProfile = () => {
  const tagProfile={
      _id:1,  
      tagTitle:"Javascript",
      tagBody:"This is body of javascript",
      questionsId:[
        1,2,3,4
      ]
    };
    const {id}=useParams();
    console.log("id of tag that you want to see it's profile",id);
    return (
    <div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <h3>{tagProfile.tagTitle}</h3>
        <h5>{tagProfile.tagBody}</h5>
        //here we have to map all the question that contain this tag
    </div>
  )
}

export default TagProfile