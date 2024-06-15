import React from 'react'
import "./Tags.css"
import moment from 'moment'
import { Link } from 'react-router-dom'
const TagsList = ({tag}) => {
  return (
    <div className='tag'>
      <Link to={`/Tags/${tag._id}`} >
        <h5>{tag.tagTitle}</h5>  
      </Link>
      <p>{tag.tagDescription}</p>
      <p>Created On  {moment(tag.createdOn).fromNow()}</p>
    </div>
  )
}

export default TagsList