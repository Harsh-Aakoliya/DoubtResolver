import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "./Followings.css"
function Followings() {
  const location = useLocation();
  const { user } = location.state || {};

  console.log("current profile in followings page", user);

  return (
    <div className='followers-container'>
      <h1>List of all the Followings</h1>
      <ul>
        {user?.followings?.length > 0 ? (
          user.followings.map((id) => (
            <Link to={`/Users/${id}`} > id </Link >
          ))
        ) : (
          <li>Not followed any one</li>
        )}
      </ul>
    </div>
  );
}

export default Followings;
