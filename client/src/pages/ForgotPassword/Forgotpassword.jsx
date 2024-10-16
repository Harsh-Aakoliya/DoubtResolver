import React, { useState } from 'react'
import icon from '../../assets/logo-stackoverflow.png'
// import AboutAuth from './AboutAuth'
import "../Auth/Auth.css"

//this is to send data to backend (i.e. to actions folder)
import { Updatepassword, login } from '../../actions/auth'
//this for dispatching above function
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import loading from '../../components/Loading/loading'
import axios from 'axios'
import { useSelector } from 'react-redux';
// const SERVER_BASE_URL="http://localhost:5000"
const SERVER_BASE_URL="https://stackoverflow-clone-bf06.onrender.com"

const Forgotpassword = () => {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    
    const dispatch =useDispatch();
    const navigate =useNavigate();

    const users=useSelector((state) => state.usersReducer)  //we got all the registed user from react redux
    
    const handleSubmit= async (e)=>{
        e.preventDefault();
        // console.log("all the users",users);
        let found=false;
        users.map((user)=>{
            if(user.email === email){
                found =true;
            }
        })
        if(found){
            axios.post(`${SERVER_BASE_URL}/Forgotpassword`,{email})
            .then(res => {
                if(res.data.Status === "Success") {
                    alert("Mail has been sent to you on email id : ",email);
                    navigate('/Auth')
                }
            }).catch(err => console.log(err))
        }
        else{
            alert("User with this email not found");
        }
    };
    // const handleSubmit= async (e)=>{
    //     e.preventDefault();
    //     try {
    //         await dispatch(Updatepassword({email},navigate));
    //     } catch (error) {
    //         console.log("error got in frontend",error);
    //     }
    //    console.log(email);
    // };
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
                <h1>Forgot Password</h1>
                <label htmlFor='email'>
                    <h4>email</h4>
                    <input type='email' name='email' id='email'  onChange={(e)=>{setEmail(e.target.value)}}/>
                </label>
                <button type='submit' className={`auth-btn ${isLoading ? 'loading' : ''}`} disabled={isLoading} >Send Mail</button>
            </form>
          
        </div>
    </section>
    )
}

export default Forgotpassword;