/* This page is temparory it is calling questionDetails  page which will display whole stuff of clicked question */

import React from 'react'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import RightSidebar from '../../components/RightSidebar/RightSidebar'
import QuestionDetails from './QuestionDetails'
const DisplayQuestion = () => {
  return (
    <div className='home-container-1'>
      <LeftSidebar/>
      <div className='home-container-2'>
        <QuestionDetails/>
        <RightSidebar/>
      </div>
    </div>
  )
}

export default DisplayQuestion