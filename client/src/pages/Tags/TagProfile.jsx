import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './TagProfile.css';

const TagProfile = () => {
    const tags = useSelector((state) => state.tagReducer);
    console.log("All the tags in TagProfile", tags);
  
    const { id } = useParams();
    console.log("ID of tag that you want to see its profile", id);

    const tag = tags.find(tag => tag._id === id);

    // Check if tag is undefined
    if (!tag) {
        return (
            <div className="loading-container">
                <h4>Loading.....</h4>
            </div>
        );
    }

    return (
        <div className="tag-profile-container">
            <h2>Tag Profile</h2>
            {/* <p><strong>ID:</strong> {tag._id}</p> */}
            <p><strong>Title:</strong> {tag.tagTitle}</p>
            <p><strong>Description:</strong> {tag.tagDescription}</p>
            <p><strong>Created On:</strong> {new Date(tag.createdOn).toLocaleDateString()}</p>
        </div>
    );
}

export default TagProfile;
