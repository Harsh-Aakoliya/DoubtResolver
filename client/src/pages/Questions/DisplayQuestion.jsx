/* This page is temparory it is calling questionDetails  page which will display whole stuff of clicked question */

import React, {useState,useEffect} from 'react'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import RightSidebar from '../../components/RightSidebar/RightSidebar'
import QuestionsDetails from './QuestionsDetails'
const DisplayQuestion = () => {
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
        <QuestionsDetails/>
        {windowWidth>=800 && <RightSidebar/>}
      </div>
    </div>
  )
}

export default DisplayQuestion