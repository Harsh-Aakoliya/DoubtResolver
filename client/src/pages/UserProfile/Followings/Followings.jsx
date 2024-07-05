import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "./Followings.css"
import { useSelector } from 'react-redux';
import User from '../../Users/User';
function Followings() {
  const location = useLocation();
  const { user } = location.state || {};

  const allUsers=useSelector((state)=>(state.usersReducer));
  console.log("all users in followings",allUsers);

  console.log("current profile in followings page", user);

  const allFollowings=[]
  for(let ithuser of allUsers||[]){
    if(user?.followings.includes(ithuser?._id)) allFollowings.push(ithuser);
  }

  return (
    <div className='followers-container'>
      <h1>List of all the Followings</h1>
      {
        (allFollowings.length === 0) && ((<div>No Followings yet</div>))
      }
        <div className='user-list-container'>
          {
              allFollowings.map((user)=>(
                  <User user={user} key={user?._id} />
              ))
          }
      </div>
    </div>
  );
}

export default Followings;
