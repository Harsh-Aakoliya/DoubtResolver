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
    const [isPassValid,setIsPassValid]=useState(false);
    const [isChecked,setIsChecked]=useState(true);

    //this is for different checks that user have to pass while creating password
    //check[0] -> password length must be in between 8 and 15
    //check[1] -> password must contain least one special character 
    //check [2] -> password must contain least one digit 
    const [checks,setChecks]=useState([false,false,false]);


    
    const dispatch =useDispatch();
    const navigate =useNavigate();



    const handleSubmit= async (e)=>{
        e.preventDefault();//when we submit form it site will not refresh
        setIsLoading(true); // Set loading state to true on form submission
        if(email && !password) {alert("Please Enter password"); setIsLoading(false);return;}
        if(!email && password) {alert("Please Enter Email"); setIsLoading(false); return ;}
        if(!email && !password) {alert("Please Enter Email and Password"); setIsLoading(false); return;}
        //we only need at signup time so 
        if(isSignup){
            if(!isPassValid) {alert("Please enter valid password"); setIsLoading(false);return; };
        }
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

    // if(password==""){
    //     setIsPassValid(true);
    // }
    const validatepass=(password)=>{
        let updatedChecks = checks.slice(); // Create a copy of checks array
        const regex_special = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        const regex_digit = /\d/;
        (password.length >= 8) ? updatedChecks[0] = true : updatedChecks[0]=false;
        (regex_special.test(password)) ? updatedChecks[1] = true : updatedChecks[1]=false;
        (regex_digit.test(password))? updatedChecks[2] = true : updatedChecks[2]=false;

        setChecks(updatedChecks);
    
        const trueCount = updatedChecks.filter(Boolean).length;
        // console.log(updatedChecks, trueCount);
        return trueCount === 3;
    }
    const setAndValidate=(e)=>{
        setPassword(e.target.value);
        // console.log("1",password,validatepass(password))
        // if(validatepass(password)){
            // console.log("2 here")
            setIsPassValid(validatepass(e.target.value));
            // console.log("3",isPassValid);
        // }
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

                    {/* case 1 if user is entering password at login time then we do not want border color change as user Enter
                    but case 2 when user is creating the password then according to criteria if it is valid then border should be green else 
                    it should be red  */}
                    {
                        isSignup ? 
                        <>
                            <input type={`${isChecked ? "text":"password"}`} name='password' id='password' style={{
                                border: `${password === "" ? "solid 1px #0000003e" :(isPassValid ? "1px solid green" : "1px solid red")}`,
                                outline: "none"
                            }} onChange={(e)=>{setAndValidate(e)}}/> 
                        </>
                        :
                        <input type={`${isChecked ? "text":"password"}`} name='password' id='password' onChange={(e)=>{setPassword(e.target.value)}} />
                        
                    }   
                    <input type='checkbox' checked={isChecked} style={
                    {fontSize:"15px"}
                    } onClick={()=>{setIsChecked(!isChecked)}}/>show password
                    {isSignup && 
                        <p style={{
                            fontSize:"13px",
                            color: `${password === "" ? "solid 1px #0000003e" :"black"}`
                            }} >
                            <span style={{
                            color: `${password === "" ? "solid 1px #0000003e" :(checks[0] ? "green" : "red")}`,
                        }}>password length must be in between 8 and 15, </span> 
                            <span style={{
                            color: `${password === "" ? "solid 1px #0000003e" :(checks[1] ? "green" : "red")}`,
                        }}>must contain least one special character, </span> 
                            <span style={{
                            color: `${password === "" ? "solid 1px #0000003e" :(checks[2] ? "green" : "red")}`,
                        }}>must contain least one digit</span>
                        </p>
                    }   
                
                </label>
       


                {isSignup && (
                    <label htmlFor='check'>
                        <input type='checkbox' id='check'/>
                        <p style={{fontSize:"13px"}}>opt to receive occetional product updates</p>
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