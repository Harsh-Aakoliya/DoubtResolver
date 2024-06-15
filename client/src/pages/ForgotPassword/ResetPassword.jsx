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
    const [isPassValid,setIsPassValid]=useState(false);
    const [isChecked,setIsChecked]=useState(false);

    //this is for different checks that user have to pass while creating password
    //check[0] -> password length must be in between 8 and 15
    //check[1] -> password must contain least one special character 
    //check [2] -> password must contain least one digit 
    const [checks,setChecks]=useState([false,false,false]);

    const {id,token}=useParams();
    
    const dispatch =useDispatch();
    const navigate =useNavigate();

    const users=useSelector((state) => state.usersReducer)  //we got all the registed user from react redux
    
    const handleSubmit= async (e)=>{
        e.preventDefault();
        // console.log(password);
        if(!isPassValid) {
            alert("Please create valid password");
            return;
        }
        axios.post(`http://localhost:5000/reset_password/${id}/${token}`,{password})
        // axios.post(`https://stackoverflow-clone-bf06.onrender.com/reset_password/${id}/${token}`,{password})
        .then(res => {
            if(res.data.Status === "Success") {
                navigate('/Auth')
            }
        }).catch(err => console.log(err))
    };

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
        if(password.length===0){
            setIsPassValid(false);
            setChecks([false,false,false]);
            return ;
        }
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
    

        <div className='auth-container-2'>
            <form onSubmit={handleSubmit}>
                <h1>Update Password</h1>
                <label htmlFor='password'>
                    <h4>Enter New Password</h4>
                    <input type={`${isChecked ? "text":"password"}`} name='password' id='password' style={{
                            border: `${password === "" ? "solid 1px #0000003e" :(isPassValid ? "1px solid green" : "1px solid red")}`,
                            outline: "none"
                    }} onChange={(e)=>{setAndValidate(e)}}/>
                    <input type='checkbox' checked={isChecked} style={
                            {fontSize:"15px"}
                    } onClick={()=>{setIsChecked(!isChecked)}}/>show password
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
                </label>
                <button type='submit' className={`auth-btn ${isLoading ? 'loading' : ''}`} disabled={isLoading} >Update Password</button>
            </form>
          
        </div>
    </section>
    )
}

export default ResetPassword;