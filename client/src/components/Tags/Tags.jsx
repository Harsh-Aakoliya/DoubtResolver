import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './Tags.css';

const Tags = (props) => {
  const { selectedTags, setSelectedTags, createdTags, setCreatedTags } = props;
  const [input, setInput] = useState('');
  const [showAllTags, setShowAllTags] = useState(false);

  const tagsData = useSelector((state) => {
    const data = state.tagReducer;
    return Array.isArray(data) ? data : [];
  });

  console.log("all tagsData data in tags.jsx file", tagsData);

  // Filter tags based on input and exclude already selected tags and created tags
  const filteredTags = tagsData.filter(tag =>
    tag.tagTitle &&
    tag.tagTitle.toLowerCase().includes(input.toLowerCase()) &&
    !selectedTags.includes(tag.tagTitle) &&
    !createdTags.some(createdTag => createdTag.tagTitle === tag.tagTitle)
  );

  console.log("filtered tags", filteredTags);

  // Check if input matches any tag or created tag
  const exactInputMatch = tagsData.some(tag => tag.tagTitle && tag.tagTitle.toLowerCase() === input.toLowerCase()) ||
    createdTags.some(tag => tag.tagTitle.toLowerCase() === input.toLowerCase()) ||
    input === '';

  // Handle tag click
  const handleTagClick = (tagTitle) => {
    setSelectedTags([...selectedTags, tagTitle]);
    setInput(''); // Clear input after selection
    setShowAllTags(false); // Hide all tags after selection
  };

  // Handle tag removal
  const handleTagRemove = (tagTitle) => {
    setSelectedTags(selectedTags.filter(title => title !== tagTitle));
  };

  // Handle create new tag
  const handleCreateTag = () => {
    const newTag = {
      tagTitle: input,
      tagDescription: `Tag description of ${input} is under process` // You can add more logic to handle description
    };
    setInput(''); // Clear input after creation
    setCreatedTags([...createdTags, newTag]);
    setShowAllTags(false); // Hide all tags after creation
  };

  // Handle created tag removal
  const handleCreatedTagRemove = (tagTitle) => {
    setCreatedTags(createdTags.filter(tag => tag.tagTitle !== tagTitle));
  };

  // Handle focus and blur with delay
  const handleBlur = () => {
    setTimeout(() => {
      setShowAllTags(false);
    }, 200);
  };

  const handleFocus = () => {
    setShowAllTags(true);
  };

  return (
    <div className="tags-container">
      <div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Search tags..."
          className="tag-input"
        />
        {showAllTags && (
          <div className="suggestions">
            {filteredTags.length > 0 ? (
              filteredTags.map((tag, index) => (
                <div key={index} onMouseDown={() => handleTagClick(tag.tagTitle)} className="suggestion-item">
                  {tag.tagTitle}
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
        )}
        {!exactInputMatch && (
          <>
            <button onMouseDown={handleCreateTag} className="create-tag-button">Create Tag</button>
          </>
        )}
      </div>
      <div>
        <h3>Selected Tags:</h3>
        <ul className="selected-tags">
          {selectedTags.map((tagTitle, index) => (
            <li key={index} className="selected-tag">
              {tagTitle}
              <span onClick={() => handleTagRemove(tagTitle)} className="remove-tag">&times;</span>
            </li>
          ))}
        </ul>
        <h3>Created Tags:</h3>
        <ul className="created-tags">
          {createdTags.map((tag, index) => (
            <li key={index} className="selected-tag">
              {tag.tagTitle}
              <span onClick={() => handleCreatedTagRemove(tag.tagTitle)} className="remove-tag">&times;</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Tags;
