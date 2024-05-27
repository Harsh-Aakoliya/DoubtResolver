import React, { useState } from 'react'
import icon from '../../assets/logo-stackoverflow.png'
// import AboutAuth from './AboutAuth'
import "../Auth/Auth.css"

//this is to send data to backend (i.e. to actions folder)
import { Updatepassword, login } from '../../actions/auth'
//this for dispatching above function
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import loading from '../../components/Loading/loading'
import axios from 'axios'
import { useSelector } from 'react-redux';

    
const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const {id,token}=useParams();
    
    const dispatch =useDispatch();
    const navigate =useNavigate();

    const users=useSelector((state) => state.usersReducer)  //we got all the registed user from react redux
    
    const handleSubmit= async (e)=>{
        e.preventDefault();
        console.log(password);
        axios.post(`http://localhost:5000/reset_password/${id}/${token}`,{password})
        // axios.post(`https://stackoverflow-clone-bf06.onrender.com/reset_password/${id}/${token}`,{password})
        .then(res => {
            if(res.data.Status === "Success") {
                navigate('/Auth')
            }
        }).catch(err => console.log(err))
    };



    return (
    <section className={`auth-section ${isLoading ? 'loading-overlay' : ''}`}>
    {
    isLoading && 
    <div className="loading-overlay">
            <h1>Validating Credential</h1>
    </div>
    }
    

        <div className='auth-container-2'>
            <form onSubmit={handleSubmit}>
                <h1>Update Password</h1>
                <label htmlFor='password'>
                    <h4>Enter New Password</h4>
                    <input type='password' name='password' id='password'  onChange={(e)=>{setPassword(e.target.value)}}/>
                </label>
                <button type='submit' className={`auth-btn ${isLoading ? 'loading' : ''}`} disabled={isLoading} >Update Password</button>
            </form>
          
        </div>
    </section>
    )
}

export default ResetPassword;