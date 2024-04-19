import React, { useState, useEffect } from 'react'
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar"
import Avatar from "../../components/Avatar/Avatar"

//to retrive all the existing users
import {useSelector} from "react-redux"
import { useParams } from 'react-router-dom'

//to use font and icon of fontawesome 
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faBirthdayCake } from "@fortawesome/free-solid-svg-icons"
//to import pen from fontawesome
// import { fapen } from "@fortawesome/free-solid-svg-icons"


//for timing
import moment from "moment"

//for showing bio and edit profile component
import EditProfileForm from './EditProfileForm'
import ProfileBio from './ProfileBio'

import {Image} from 'cloudinary-react';



import "./UsersProfile.css"


const UserProfile = () => {

  const users=useSelector((state) => state.usersReducer)  //we got all the registed user from react redux
  console.log("all the users",users);
  //now we are extracting id of that user on whose profile currently we at
  const {id}=useParams();
  // console.log(id);
  const  currentProfile=users.filter((user) => user._id === id)[0];
  console.log("currentprofile",currentProfile);

  //now we need to diffrentiate current user who have currently logged in and that user whose profile we are currently viewing
  const currentUser= useSelector((state) => state.currentUserReducer);
  console.log("currentUser",currentUser);

  const [Switch, setSwitch] =useState(false);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='home-container-1'>
       { windowWidth>=700 && <LeftSidebar/>}
          <div className="home-container-2">
              <section>
                  <div className="user-details-container">
                   <div className="user-details">
                      <Image
                        src={currentProfile?.profilePhoto}
                        width="128"
                        height="128"
                        alt="Image not found"
                        onError={(e) => console.log("Image Error:", e)}
                      />
                      <div className="user-name">
                        <h1>{currentProfile?.name}</h1>
                        <p><FontAwesomeIcon icon={faBirthdayCake} /> Joined {moment(currentProfile?.joinedOn).fromNow()}</p>
                      </div>
                    </div> 
                      {
                        //if current logged in user and profile which we are viewing is same then and only then we need to show that edit btn
                        currentUser?.result._id === id && (
                          <button type='button' onClick={() => setSwitch(true)} className='edit-profile-btn'>
                            {/* <FontAwesomeIcon icon={fapen} />  */}
                            Edit Profile
                          </button>
                        )
                      }
                  </div>
                  {/* if we click on edit profile btn then we need to show that edit form else we will show bio details */}
                  <>
                      {
                        Switch ?(
                          <EditProfileForm currentUser={currentUser} setSwitch={setSwitch}/>
                        ):(
                          <ProfileBio currentProfile={currentProfile}/>
                        )
                      }
                  </>
              </section>
          </div>
    </div>
  )
}

export default UserProfile