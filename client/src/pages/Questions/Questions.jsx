import React, { useState, useEffect } from 'react'
import '../../App.css'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import HomeMainbar from '../../components/HomeMainbar/HomeMainbar'
import RightSidebar from '../../components/RightSidebar/RightSidebar'

const Questions = () => {
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
    <div className='home-container-1'>
      { windowWidth>=700 && <LeftSidebar/>}
      
      <div className='home-container-2'>
        <HomeMainbar/>
        {windowWidth>=800 && <RightSidebar/>}
      </div>
    </div>
  )
}
export default Questions