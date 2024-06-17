import React, { useState } from 'react'


import {useDispatch} from "react-redux"
import { updateProfile } from '../../actions/users';
import dummy from '../../assets/dummy.png'

import store from '../..';


const EditProfileForm = ({currentUser,setSwitch}) => {


    const [name,setName] =useState(currentUser?.result?.name);
    const [about,setAbout] =useState(currentUser?.result?.about);
    const [tags,setTags] =useState("");

    const [fileInputState, setFileInputState] = useState('');
    const [selectedFile, setSelectedFile] = useState(dummy);
    const [previewSource, setPreviewSource] = useState(dummy);


    const handleFileInputChange = (e) => {
        // console.log("logging event",e);
        // console.log("all the files",e.target.files)
        const file = e.target.files[0];//from multi upload grab the first one
        // console.log("logging the file",file);
        previewFile(file);//user can see what they want to upload
        setSelectedFile(file);
        setFileInputState(e.target.value);
        // console.log("selected file is ",selectedFile);
    };
    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);//converting image to url
        reader.onloadend = () => {
            // console.log("Rendering the result",reader.result)
            setPreviewSource(reader.result);//as soon as file being uploaded we will change the preview state
        };
    };

    // store.subscribe(()=>console.log("state has been updated and updated state is ",store.getState()))

    const dispatch=useDispatch();
    const handleSubmit =(e)=>{
        e.preventDefault();
        //we can write below login
        // if(!selectedFile) 
        // console.log(currentUser);
        // console.log("1 Dispatching name,abount,tags and preview souce from frontend");
        // console.log("after 1",previewSource);
        if(tags.length === 0){
            dispatch(updateProfile(currentUser?.result?._id,{name,about,tags:currentUser?.result?.tags,previewSource})); //if tags are not given by user then we will send tags that is already avilable to that profile
        }
        else{
            dispatch(updateProfile(currentUser?.result?._id,{name,about,tags,previewSource}));
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
                {
                    previewSource &&(
                        <img src={previewSource} alt="choosen" style={{height:"128px" , width: "128px"}} />
                    )
                }
                <input
                    id="fileInput"
                    type="file"
                    name="image"
                    onChange={(e)=>{handleFileInputChange(e)}}
                    value={fileInputState}
                    className="form-input"
                />
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