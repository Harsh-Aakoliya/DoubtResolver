import React, { useState } from 'react'
import icon from '../../assets/logo-stackoverflow.png'
import AboutAuth from './AboutAuth'
import './Auth.css'

//this is to send data to backend (i.e. to actions folder)
import { signup,login } from '../../actions/auth'
//this for dispatching above function
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import loading from '../../components/Loading/loading'




const Auth = () => {
    //false means in Auth page we are at Login location
    //true means in Auth page we are at Signup location
    //initially it will be false
    const [isSignup,setIssignup]=useState(false);

    //this useState hooks are for backend so that onsubmiting form the name,email and password will goto backend 
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    
    const dispatch =useDispatch();
    const navigate =useNavigate();



    const handleSubmit= async (e)=>{
        e.preventDefault();//when we submit form it site will not refresh
        setIsLoading(true); // Set loading state to true on form submission
        if(email && !password) {alert("Please Enter password"); setIsLoading(false);return;}
        if(!email && password) {alert("Please Enter Email"); setIsLoading(false); return ;}
        if(!email && !password) {alert("Please Enter Email and Password"); setIsLoading(false); return;}
        setError('');
    //     if(isSignup){
    //         if(!name){
    //             alert("Enter name to continue")
    //         }
    //         //sending data to auth.js file of action folder
    //         dispatch(signup({name,email,password},navigate));
    //     }
    //     else{
    //         dispatch(login({email,password},navigate));
    //     }
        
    //     console.log({name,email,password});
    // }
    if (isSignup && !name) {
        setError('Please enter your name to continue.');
        setIsLoading(false);
        return;
      }
  
      try {
        // document.getElementsByClassName("auth-btn").disabled=true;
        if (isSignup) {
            await dispatch(signup({ name, email, password }, navigate));
        } else {
            await dispatch(login({ email, password }, navigate));
        }
    } catch (error) {
        console.error(error);
        
        setError('Authentication failed. Please check your credentials and try again.');
        
        // document.getElementsByClassName("auth-btn").disabled=false;
      } finally{
        setIsLoading(false);
      }
    };
    
    const handleSwitch=()=>{
        setIssignup(!isSignup);
    }

    const handleforgotpass=()=>{
        navigate("/Forgotpassword");
    }

  return (
    <section className={`auth-section ${isLoading ? 'loading-overlay' : ''}`}>
    {
    isLoading && 
    <div className="loading-overlay">
            <h1>Validating Credential</h1>
    </div>
    }
    {
        isSignup && <AboutAuth />
    }

        <div className='auth-container-2'>
           {!isSignup && <img src={icon} alt='stack Overflow logo' className='login-logo'></img>} 
            <form onSubmit={handleSubmit}>
                {
                    isSignup && (
                        <label htmlFor='name'>
                           <h4>Display Name</h4>
                           <input type="text" id="name" name="name" onChange={(e)=>{setName(e.target.value)}} />
                        </label>
                    )
                }

                {/* here if htmlfor and id for email is same then when we click on email written above email box out pointer will automatically go into that email text box */}
                <label htmlFor='email'>
                    <h4>email</h4>
                    <input type='email' name='email' id='email'  onChange={(e)=>{setEmail(e.target.value)}}/>
                </label>
                <label htmlFor='password'>
                    <div style={{display:'flex',justifyContent:'space-between'}}>
                        <h4>Password</h4>
                        {/* if we wan't to do login at that time we need forgot password else at the time of account creation i.e. at time of signup we don't need forgot password  */}
                        {!isSignup &&<button type='button' onClick={handleforgotpass}>Forgot Password</button>}
                        
                    </div>
                    <input type='password' name='password' id='password'  onChange={(e)=>{setPassword(e.target.value)}}/>

                    {isSignup && <p style={{color:"#666767" ,fontSize:"13px"}}>password must contain least eight <br />character ,including least 1 <br />letter and 1 digit</p>}

                </label>

                {isSignup && (
                    <label htmlFor='check'>
                        <input type='checkbox' id='check'/>
                        <p style={{fontSize:"13px"}}>opt to receive occetional product updates,user researcha;a;sd</p>
                    </label>
                )}

                <button type='submit' className={`auth-btn ${isLoading ? 'loading' : ''}`} disabled={isLoading} >{isSignup ? "Sign Up ": "Log In"} </button>
                {
                    isSignup && (
                        <p style={{color:"#666767" ,fontSize:"13px"}}>
                            by clicking sign up , you are agree to our 
                            <span style={{color:"#007ac6"}}>terms of<br/> services </span>,
                            <span style={{color:"#007ac6"}}>privacy and policy </span>,and 
                            <span style={{color:"#007ac6"}}>cookies policy </span>
                        </p>
                    )
                }
            </form>
            <p>
                {isSignup ? "already have an account":"Don't have an account"}
                   <button type='button' className='handle-switch-btn' onClick={handleSwitch}>{isSignup?"Login":"signup"}
                </button>
            </p>
        </div>
    </section>
  )
}

export default Auth;