// import React from 'react';

// const Vote = ({ type, isFilled }) => {
//   const strokeWidth = isFilled ? 4 : 2; // Thicker line for filled arrows

//   const upArrow = (
//     <svg
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill={isFilled ? 'black' : 'none'}
//       stroke="black"
//       strokeWidth={strokeWidth}
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M12 19V5m-7 7l7-7 7 7" />
//     </svg>
//   );

//   const downArrow = (
//     <svg
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill={isFilled ? 'black' : 'none'}
//       stroke="black"
//       strokeWidth={strokeWidth}
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M12 5v14m7-7l-7 7-7-7" />
//     </svg>
//   );

//   return (
//     <div>
//       {type === 'upVote' ? upArrow : downArrow}
//     </div>
//   );
// };

// export default Vote;




import React from "react";

function Vote({ type, isFilled }) {
  return (
    <svg height="25px" width="25px">
      {type === "upVote" ? (
        <polygon 
          points="12.5,2.5 22.5,22.5 2.5,22.5" 
          style={{
            fill: isFilled ? '#000000' : 'white',
            strokeWidth: isFilled ? 0 : 2.5,
            stroke: 'grey',
          }}
        />
      ) : (
        <polygon 
          points="12.5,22.5 22.5,2.5 2.5,2.5" 
          style={{
            fill: isFilled ? '#000000' : 'white',
            strokeWidth: isFilled ? 0 : 2.5,
            stroke: 'grey',
          }}
        />
      )}
    </svg>
  );
}

export default Vote;

