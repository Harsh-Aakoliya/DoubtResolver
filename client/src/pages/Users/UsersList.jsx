//this is ingeneral for all the user list

import React from 'react'
import { UseSelector, useSelector } from 'react-redux'
import User from "./User"
import "./Users.css";
const UsersList = () => {
    const users=useSelector((state)=>state.usersReducer);//retriving all the users from redux store
  return (
    <div className='user-list-container'>
        {
            users.map((user)=>(
                <User user={user} key={user?._id} />
            ))
        }
    </div>
  )
}

export default UsersList