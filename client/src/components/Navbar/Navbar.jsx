import React,{useEffect} from 'react'

import './Navbar.css'

import { Link } from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import logo from '../../assets/logo-stackoverflow.png'
import search from '../../assets/magnifying-glass-solid.png'
import Avatar from '../../components/Avatar/Avatar'
import { setCurrentUser } from '../../actions/currentUser'


//for log out 
import { useNavigate } from 'react-router-dom'
import decode from "jwt-decode"//it will be used to check weater token is expried or not


const Navbar = () => {

    // var User=null;//now instead of setting manually our login data is available in local storage so we can use it
    // var User=JSON.parse(localStorage.getItem("Profile")) //here using this also we can get user name but many times we need to use this User value so we can do that we will get this value perticullaly only one time and we can dispatch value to REDUX and we can get that value when ever we want now to do that we need to go to action page 
    var User=useSelector((state)=>(state.currentUserReducer));//if we only do this then if we reload site then login use will go because we are only dispatching data only at login time itself now on other action. now to not do that we need useDispatch and useEffect hook so when ever our navbar will load then we will run code for dispatching data of user in REDUX 

    const dispatch=useDispatch();
    
    
    //for log out functionallity
    const navigate=useNavigate();
    const handleLogout=()=>{
        dispatch({type:"LOGOUT"});//goto reducers auth.js
        navigate("/");
        dispatch(setCurrentUser(null));//after log out we need to set current user as null
    }
    useEffect(()=>{
        //now as we have setted token time as 1hr so after 1hr our profile should be deleted from localstorage for security perpose like suppose we are using our application at public spot and after that use if we forgot to logout then automatically after token time (in our case it is 1hr) profile should automatically deleted from localstorage 
        const token=User?.token;
        if(token){//token is still alive
            const decodedToken=decode(token);//we need to decode our token because it is in formate like token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImF0ZW1wQGdtYWlsLmNvbSIsImlkIjoiNjRmOTk1ZTQ1ZGFjY2ZiZTBjYTVmODNiIiwiaWF0IjoxNjk0OTI5NTI2LCJleHAiOjE2OTQ5MzMxMjZ9.zcHYtaVRUn4A4hcHx9SkXaU7sy1JNV2kh-5gnp1dFNM"
            //now we need to compare decodedToken's expitre time with the present time
            if(decodedToken.exp * 1000 < new Date().getTime()){
                handleLogout();
            }
        }
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))))
    },[dispatch]);
    
    return (
    <nav className='main-nav'>
        <div className='navbar'>
            <Link to='/' className='nav-item nav-logo'>
                <img src={logo} alt="Logo" />
            </Link>
            <Link to='/' className='nav-item nav-btn'>About</Link>
            <Link to='/' className='nav-item nav-btn'>Product</Link>
            <Link to='/' className='nav-item nav-btn'>For Team</Link>
            <form>
                <input type='text' placeholder="search..."/>
                <img src={search} alt='search' className='search-icon'/>
            </form>
            {User === null ? 
                <Link to='/Auth' className='nav-item nav-links'>Log In</Link>:
                <>
                    <Avatar backgroundColor="#009dff" px='10px' py='7px' borderRadius='50%' color="white">
                        {/* here to="/" for Link tag will be profile page not home page */}
                        <Link to={`Users/${User?.result?._id}`} style={{color:"white" , textDecoration:"none"}}>{User.result.name.charAt(0).toUpperCase()}</Link>
                    </Avatar>
                    <button className='nav-item nav-links' onClick={handleLogout}>Log Out</button>
                </>
            }
        </div>
    </nav>
  );
};

export default Navbar;