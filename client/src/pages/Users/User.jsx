//this will be for particular user 
import React from 'react'
import { Link } from 'react-router-dom'
import "./Users.css";
import Image from '../../components/Common/Image';

const User = ({user}) => {
  console.log("User is")
  return (
    <Link to={`/Users/${user._id}`} className='user-profile-link'>
        {
          user.profilePhoto ?
          <Image height={"50px"} width={"50px"} src={user?.profilePhoto} alt={user.name.charAt(0).toUpperCase()} />:
          <h3 >{user.name.charAt(0).toUpperCase()}</h3>
        }

        <h5>{user.name}</h5>
    </Link>
  )
}

export default User