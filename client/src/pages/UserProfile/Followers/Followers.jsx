import React from 'react';
import { useLocation } from 'react-router-dom';
import "./Followers.css"
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import User from '../../Users/User';
function Followers() {
  const location = useLocation();
  const { user } = location.state || {};

  const allUsers=useSelector((state)=>(state.usersReducer));
  console.log("all users in followings",allUsers);

  console.log("current profile in followings page", user);

  const allFollowers=[]
  for(let ithuser of allUsers||[]){
    if(user?.followers.includes(ithuser?._id)) allFollowers.push(ithuser);
  }

  return (
    <div className='followers-container'>
      <h1>List of all the Followers</h1>
      {
        (allFollowers.length === 0) && ((<div>No Followers yet</div>))
      }
        <div className='user-list-container'>
          {
              allFollowers.map((user)=>(
                  <User user={user} key={user?._id} />
              ))
          }
      </div>
    </div>
  );
}

export default Followers;
