import React from 'react';
import { useLocation } from 'react-router-dom';
import "./Followers.css"
import { Link } from 'react-router-dom';
function Followers() {
  const location = useLocation();
  const { user } = location.state || {};

  console.log("current profile in followings page", user);

  return (
    <div className='followers-container'>
      <h1>List of all the Followers Users</h1>
      <ul>
        {user?.followers?.length > 0 ? (
          user.followers.map((id) => (
            <Link to={`/Users/${id}`} > id </Link >
          ))
        ) : (
          <li>No followers yet</li>
        )}
      </ul>
    </div>
  );
}

export default Followers;
