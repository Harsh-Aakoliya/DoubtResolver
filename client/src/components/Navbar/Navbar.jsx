import React from 'react'

import './Navbar.css'

import { Link } from 'react-router-dom'
import logo from '../../assets/logo-stackoverflow.png'
import search from '../../assets/magnifying-glass-solid.png'
import Avatar from '../../components/Avatar/Avatar'

const Navbar = () => {

    var User=null;

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
                        <Link to="/User" style={{color:"white" , textDecoration:"none"}}>M</Link>
                    </Avatar>
                    <button className='nav-item nav-links'>Log Out</button>
                </>
            }
        </div>
    </nav>
  );
};

export default Navbar