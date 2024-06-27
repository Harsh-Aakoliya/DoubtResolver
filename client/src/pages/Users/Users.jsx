//this is overall page of "Users"
import React,{useEffect,useState} from 'react'
import "./Users.css"
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import { useLocation } from 'react-router-dom'
import UsersList from "./UsersList";
const Users = () => {
  const location=useLocation();
//   console.log(location);
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
    <div className="home-container-1">
        { windowWidth>768 && <LeftSidebar/>}
        <div className="home-container-2" style={{marginTop: "30px"}}>
        <h1 style={{fontWeight:"400"}}>Users</h1>
          <UsersList/>
        </div>
    </div>
  )
}

export default Users