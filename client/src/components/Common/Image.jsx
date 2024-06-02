import React from 'react';

function Image(props) {
  return (
    <img
      height={props.height}
      width={props.width}
      src={props.src}
      alt={props.alt}
      style={props.style} // Applying the styles passed as props
    />
  );
}

export default Image;
