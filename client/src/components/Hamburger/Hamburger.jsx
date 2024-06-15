import React from 'react';
import './Hamburger.css';

function Hamburger(props) {
  // console.log(props);
  let isOpen=props.clicked;
  // console.log('is opend inside hamburger menu',isOpen);
  return (
    <div className={`hamburger ${isOpen ? 'open' : ''}`}>
      <div className="line"></div>
      <div className="line"></div>
      <div className="line"></div>
    </div>
  );
}

export default Hamburger;
