import React, { useEffect, useState, useRef, useCallback } from 'react';

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

    const containerRef = useRef(null);

    const handleLinkClick = useCallback(() => {
        setClicked(false);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setClicked(false);
            }
        };

        if (clicked) {
            document.addEventListener('mousedown', handleClickOutside);
            const links = containerRef.current.querySelectorAll('a');
            links.forEach(link => link.addEventListener('click', handleLinkClick));
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
            if (containerRef.current) {
                const links = containerRef.current.querySelectorAll('a');
                links.forEach(link => link.removeEventListener('click', handleLinkClick));
            }
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            if (containerRef.current) {
                const links = containerRef.current.querySelectorAll('a');
                links.forEach(link => link.removeEventListener('click', handleLinkClick));
            }
        };
    }, [clicked, handleLinkClick]);

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
        <div ref={containerRef} className='outer'>
            <nav className='main-nav'>
                    <div className='toggle-section'>
                        <button
                            className="toggle-button"
                            onClick={handleClick}
                        >
                            <Hamburger clicked={clicked} />
                        </button>
                        <div 
                            className={clicked ? 'left-sidebar-div-expand' : 'left-sidebar-div-collapse'}>
                            <LeftSidebar />
                        </div>
                    </div>
                    <div className='navbar'>
                        <div className='left-section'>
                            <Link to='/' className='nav-item nav-logo'>
                                {windowWidth <= 768 ? 
                                    <img src={mini_logo} style={{ height: "50px", width: "50px" }} /> : 
                                    <img src={logo} alt="Logo" />
                                }
                            </Link>
                            <Link to='/' className='nav-item nav-btn'>About</Link>
                            <Link to='/' className='nav-item nav-btn'>Product</Link>
                            <Link to='/' className='nav-item nav-btn'>For Team</Link>
                        </div>

                        <div className='right-section'>  
                            <div className='search'>
                                <img src={search} alt='search' className='search-icon' />
                                <input type='text' placeholder="search..." />
                                
                            </div>                      
                            {
                                User === null ? 
                                <Link to='/Auth' className='nav-item nav-links'>Log In</Link> :
                                <>
                                    <Link to={`Users/${User?.result?._id}`} >
                                        <Image
                                            width="30px"
                                            height="30px"
                                            src={User?.result?.profilePhoto}
                                            alt="Image of profile"
                                            style={{
                                                // marginRight: "10px",
                                                borderRadius: "5px",
                                            }}
                                        />
                                    </Link>
                                    <button className='nav-item nav-links' onClick={handleLogout}>Log Out</button>
                                </>
                            }
                        </div>
                    </div>
            </nav>
        </div>
    );
};

export default Navbar;