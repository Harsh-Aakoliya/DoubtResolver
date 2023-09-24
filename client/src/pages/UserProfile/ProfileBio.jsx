import React from 'react'

const ProfileBio = ({currentProfile}) => {
  return (
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
  )
}

export default ProfileBio