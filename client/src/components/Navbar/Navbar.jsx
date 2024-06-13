// import React, { useEffect, useState, useRef } from 'react';

// import './Navbar.css';
// import { Link } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import logo from '../../assets/logo-stackoverflow.png';
// import mini_logo from '../../assets/stackoverflow-mini-logo.png';
// import search from '../../assets/magnifying-glass-solid.png';
// import Avatar from '../../components/Avatar/Avatar';
// import { setCurrentUser } from '../../actions/currentUser';

// //for log out 
// import { useNavigate } from 'react-router-dom';
// import decode from "jwt-decode"; // it will be used to check whether the token is expired or not
// import LeftSidebar from '../LeftSidebar/LeftSidebar';

// //for toggling that left bar at nav bar
// import Hamburger from '../Hamburger/Hamburger';

// //for image 
// import Image from '../Common/Image';

// const Navbar = () => {
//     var User = useSelector((state) => (state.currentUserReducer)); // if we only do this then if we reload site then login user will go because we are only dispatching data only at login time itself now on other action. now to not do that we need useDispatch and useEffect hook so whenever our navbar will load then we will run code for dispatching data of user in REDUX 

//     const dispatch = useDispatch();
    
//     //for log out functionality
//     const navigate = useNavigate();
//     const handleLogout = () => {
//         dispatch({ type: "LOGOUT" }); //goto reducers auth.js
//         navigate("/");
//         dispatch(setCurrentUser(null)); //after log out we need to set current user as null
//     }

//     const [clicked, setClicked] = useState(false);
//     const handleClick = () => {
//         console.log("button clicked",clicked);
//         setClicked(!clicked);
//     }

//     const sidebarRef = useRef(null);
//     const toggleButtonRef = useRef(null);


//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (
//                 sidebarRef.current &&
//                 !sidebarRef.current.contains(event.target) &&
//                 toggleButtonRef.current &&
//                 !toggleButtonRef.current.contains(event.target)
//             ) {
//                 console.log("button clicked", clicked);
//                 setClicked(false);
//             }
//         };

//         document.addEventListener("mousedown", handleClickOutside);

//         return () => {
//             document.removeEventListener("mousedown", handleClickOutside);
//         };
//     }, []);

//     useEffect(() => {
//         const token = User?.token;
//         if (token) { //token is still alive
//             const decodedToken = decode(token);
//             if (decodedToken.exp * 1000 < new Date().getTime()) {
//                 alert("Session has been expired");
//                 handleLogout();
//             }
//         }
//         dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
//     }, [dispatch]);

//     const [windowWidth, setWindowWidth] = useState(window.innerWidth);

//     useEffect(() => {
//         const handleResize = () => {
//             setWindowWidth(window.innerWidth);
//         };

//         window.addEventListener('resize', handleResize);

//         return () => {
//             window.removeEventListener('resize', handleResize);
//         };
//     }, []);

//     return (
//         <nav className='main-nav'>
//             <div className='temp'>
//                 <button className="toggle-button" onClick={handleClick}>
//                     <Hamburger clicked={clicked} />
//                 </button>
//                 <div 
//                     className={clicked ? 'left-sidebar-div-expand' : 'left-sidebar-div-collapse'}
//                     ref={sidebarRef, toggleButtonRef}
//                     // ref={toggleButtonRef}
//                 >
//                     <LeftSidebar />
//                 </div>
//             </div>
//             <div className='navbar'>
//                 <Link to='/' className='nav-item nav-logo'>
//                     {windowWidth < 700 ? 
//                         <img src={mini_logo} style={{ height: "50px", width: "50px" }} /> : 
//                         <img src={logo} alt="Logo" />
//                     }
//                 </Link>
//                 <Link to='/' className='nav-item nav-btn'>About</Link>
//                 <Link to='/' className='nav-item nav-btn'>Product</Link>
//                 <Link to='/' className='nav-item nav-btn'>For Team</Link>
//                 <form>
//                     <input type='text' placeholder="search..." />
//                     <img src={search} alt='search' className='search-icon' />
//                 </form>

//                 {User === null ? 
//                     <Link to='/Auth' className='nav-item nav-links'>Log In</Link> :
//                     <>
//                         <Link to={`Users/${User?.result?._id}`} >
//                             <Image
//                                 width="30px"
//                                 height="30px"
//                                 src={User?.result?.profilePhoto}
//                                 alt="Image of profile"
//                                 style={{
//                                     marginRight: "10px",
//                                     borderRadius: "5px",
//                                 }}
//                             />
//                         </Link>
//                         <button className='nav-item nav-links' onClick={handleLogout}>Log Out</button>
//                     </>
//                 }
//             </div>
//         </nav>
//     );
// };

// export default Navbar;


import React, { useEffect, useState, useRef } from 'react';

import './Navbar.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import logo from '../../assets/logo-stackoverflow.png';
import mini_logo from '../../assets/stackoverflow-mini-logo.png';
import search from '../../assets/magnifying-glass-solid.png';
import Avatar from '../../components/Avatar/Avatar';
import { setCurrentUser } from '../../actions/currentUser';

//for log out 
import { useNavigate } from 'react-router-dom';
import decode from "jwt-decode"; // it will be used to check whether the token is expired or not
import LeftSidebar from '../LeftSidebar/LeftSidebar';

//for toggling that left bar at nav bar
import Hamburger from '../Hamburger/Hamburger';

//for image 
import Image from '../Common/Image';

const Navbar = () => {
    const User = useSelector((state) => (state.currentUserReducer)); 

    const dispatch = useDispatch();
    
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch({ type: "LOGOUT" }); 
        navigate("/");
        dispatch(setCurrentUser(null)); 
    }

    const [clicked, setClicked] = useState(false);
    const handleClick = () => {
        setClicked(!clicked);
    }

    const sidebarRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                sidebarRef.current && 
                !sidebarRef.current.contains(event.target) // Check if click is outside sidebar
            ) {
                setClicked(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const token = User?.token;
        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) {
                alert("Session has been expired");
                handleLogout();
            }
        }
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
    }, [dispatch]);

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <nav className='main-nav'>
            <div className='temp'>
                <button
                    className="toggle-button"
                    onClick={handleClick}
                >
                    <Hamburger isOpen={clicked} />
                </button>
                <div 
                    className={clicked ? 'left-sidebar-div-expand' : 'left-sidebar-div-collapse'}
                    ref={sidebarRef}
                >
                    <LeftSidebar windowWidth={windowWidth} clicked={clicked} setClicked={setClicked}/>
                </div>
            </div>
            <div className='navbar'>
                <Link to='/' className='nav-item nav-logo'>
                    {windowWidth < 700 ? 
                        <img src={mini_logo} style={{ height: "50px", width: "50px" }} /> : 
                        <img src={logo} alt="Logo" />
                    }
                </Link>
                <Link to='/' className='nav-item nav-btn'>About</Link>
                <Link to='/' className='nav-item nav-btn'>Product</Link>
                <Link to='/' className='nav-item nav-btn'>For Team</Link>
                <form>
                    <input type='text' placeholder="search..." />
                    <img src={search} alt='search' className='search-icon' />
                </form>

                {User === null ? 
                    <Link to='/Auth' className='nav-item nav-links'>Log In</Link> :
                    <>
                        <Link to={`Users/${User?.result?._id}`} >
                            <Image
                                width="30px"
                                height="30px"
                                src={User?.result?.profilePhoto}
                                alt="Image of profile"
                                style={{
                                    marginRight: "10px",
                                    borderRadius: "5px",
                                }}
                            />
                        </Link>
                        <button className='nav-item nav-links' onClick={handleLogout}>Log Out</button>
                    </>
                }
            </div>
        </nav>
    );
};

export default Navbar;
