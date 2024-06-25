import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
function Profile() {
    const users=useSelector((state) => state.usersReducer)  //we got all the registed user from react redux
  // console.log("all the users",users);
  //now we are extracting id of that user on whose profile currently we at
  const {id}=useParams();
  // console.log(id);
  const  currentProfile=users?.filter((user) => user._id === id)[0];
  return (
    <div>
        <div>
            <div>
                {
                    // if that user have tags then we need to show it
                    currentProfile?.tags.length !== 0 ? (
                        <>
                            <h4>Tags Watched</h4>
                            {
                                currentProfile?.tags.map((tag) => (
                                    <p key={tag}>{tag}</p>
                                ))
                            }
                        </>
                    ):(
                        <p>0 tags whatched</p>
                    )
                }
            </div>
            <div>
                {
                    currentProfile?.about ? (
                        <>
                            <h4>About</h4>
                            <p>{currentProfile?.about}</p>
                        </>
                    ):(
                        <p>No bio found</p>
                    )
                }
            </div>
        </div>
    </div>
  )
}

export default Profile