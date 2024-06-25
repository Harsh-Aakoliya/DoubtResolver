import React from "react";
import "./Bookmark.css";

function Bookmark({ isBookmarked }) {
  return (
    <svg height="25px" width="25px">
      <polygon 
        points="2.5,2.5 22.5,2.5 22.5,25 12.5,15 2.5,25" 
        style={{
          fill: isBookmarked ? '#F48024' : 'white',  // Ensure hex color has a #
          strokeWidth: isBookmarked ? 0:2.5,
          stroke: 'grey',
        }}
      />
    </svg>
  );
}

export default Bookmark;