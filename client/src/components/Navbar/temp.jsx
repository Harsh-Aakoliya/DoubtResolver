import React, { useEffect, useState, useRef, useCallback } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import logo from '../../assets/logo-stackoverflow.png';
import mini_logo from '../../assets/stackoverflow-mini-logo.png';
import search from '../../assets/magnifying-glass-solid.png';
import { setCurrentUser } from '../../actions/currentUser';
import { useNavigate } from 'react-router-dom';
import decode from "jwt-decode";
import LeftSidebar from '../LeftSidebar/LeftSidebar';
import Hamburger from '../Hamburger/Hamburger';
import Image from '../Common/Image';

const Navbar = () => {
    const User = useSelector((state) => (state.currentUserReducer)); 
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [clicked, setClicked] = useState(false);
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);

    const containerRef = useRef(null);

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" }); 
        navigate("/");
        dispatch(setCurrentUser(null)); 
    }

    const handleClick = () => {
        setClicked(!clicked);
    }

    const handleLinkClick = useCallback(() => {
        setClicked(false);
    }, []);

    const toggleSearchBar = () => {
        setShowSearchBar(!showSearchBar);
    };

    const toggleProfileDropdown = () => {
        setShowProfileDropdown(!showProfileDropdown);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setClicked(false);
                setShowProfileDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
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

    


    return (
        <div ref={containerRef}>
            <nav className='main-nav'>
                <div className='temp'>
                    <button className="toggle-button" onClick={handleClick}>
                        <Hamburger clicked={clicked} />
                    </button>
                    <div className={clicked ? 'left-sidebar-div-expand' : 'left-sidebar-div-collapse'}>
                        <LeftSidebar clicked={clicked} setClicked={setClicked}/>
                    </div>
                </div>
                <div className='navbar'>
                    <Link to='/' className='nav-item nav-logo'>
                        <img src={logo} alt="Logo" className="full-logo" />
                        <img src={mini_logo} alt="Mini Logo" className="mini-logo" />
                    </Link>
                    <Link to='/' className='nav-item nav-btn'>About</Link>
                    <Link to='/' className='nav-item nav-btn'>Product</Link>
                    <Link to='/' className='nav-item nav-btn'>For Team</Link>
                    <form className="search-form">
                        <input type='text' placeholder="Search..." />
                        <img src={search} alt='search' className='search-icon' />
                    </form>
                    <div className="nav-icons">
                        <img src={search} alt='search' className='icon search-icon-mobile' onClick={toggleSearchBar} />
                        {User && (
                            <div className="profile-icon-container">
                                <Image
                                    width="30px"
                                    height="30px"
                                    src={User?.result?.profilePhoto}
                                    alt="Profile"
                                    className="icon profile-icon"
                                    onClick={toggleProfileDropdown}
                                />
                                {showProfileDropdown && (
                                    <div className="profile-dropdown">
                                        <Link to={`Users/${User?.result?._id}`}>Visit Profile</Link>
                                        <button onClick={handleLogout}>Log Out</button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    {User === null ? 
                        <Link to='/Auth' className='nav-item nav-links'>Log In</Link> :
                        <button className='nav-item nav-links logout-btn' onClick={handleLogout}>Log Out</button>
                    }
                </div>
            </nav>
            {showSearchBar && (
                <div className="search-bar-mobile">
                    <form>
                        <input type='text' placeholder="Search..." />
                        <img src={search} alt='search' className='search-icon' />
                    </form>
                </div>
            )}
        </div>
    );
};

export default Navbar;