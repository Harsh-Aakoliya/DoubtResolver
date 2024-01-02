import React, { useState } from 'react'


import {useDispatch} from "react-redux"
import { updateProfile } from '../../actions/users';
import dummy from '../../assets/logo-stackoverflow.png'

const EditProfileForm = ({currentUser,setSwitch}) => {


    const [name,setName] =useState(currentUser?.result?.name);
    const [about,setAbout] =useState(currentUser?.result?.about);
    const [tags,setTags] =useState("");

    const [postImage, setPostImage] = useState("")
    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        console.log(base64)
        setPostImage({ ...postImage, myFile : base64 })
      }

    const dispatch=useDispatch();
    const handleSubmit =(e)=>{
        e.preventDefault();

        if(tags.length === 0){
            dispatch(updateProfile(currentUser?.result?._id,{name,about,tags:currentUser?.result?.tags,postImage})); //if tags are not given by user then we will send tags that is already avilable to that profile
        }
        else{
            dispatch(updateProfile(currentUser?.result?._id,{name,about,tags,postImage}));
        }
        setSwitch(false);//we are going to that state where we are displying bio
    }


  return (
    <div>
        <h1 className='edit-profile-title'> Edit Your Profile</h1>
        <h2 className="edit-profile-title-2">Public Information</h2>
        <form  className="edit-profile-form" onSubmit={handleSubmit}>
            <label htmlFor="name">
                <h3>Display Name</h3>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
            </label>
            <label htmlFor="picture">
                <h3>Display Photo</h3>
                <img src={postImage.myFile || dummy} alt="" />
                <input type="file" lable="Image" name="myFile" id='file-upload' accept='.jpeg, .png, .jpg' onChange={(e) => handleFileUpload(e)}/>
            </label>
            <label htmlFor="about">
                <h3>About Me</h3>
                <textarea id="about" cols="30" rows="10" value={about} onChange={(e) => setAbout(e.target.value)} ></textarea>
            </label>
            <label htmlFor="tags">
               <h3>Watched Tags</h3> 
               <p>Add tags seperated by one space</p>
               <input type="text" id='tags' onChange={(e) => setTags(e.target.value.split(" "))} />
            </label><br />
            <input type="submit" value="Save Profile" />
            <button type='button' className='user-cancel-btn' onClick={()=>setSwitch(false)}>Cancel</button>
        </form>
    </div>
  )
}

export default EditProfileForm

function convertToBase64(file){
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result)
      };
      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }