// import React, { useState } from 'react'
// import './LeftSidebar.css'
// import {NavLink} from 'react-router-dom' /*The links which uses at Nav*/
// import Globe from '../../assets/globe.png'
// const LeftSidebar = (props) => {
//   let windowWidth=props.windowWidth;
//   // let [clicked,setClicked]=props.clicked;
//   let clicked=props.clicked;
//   // const [clicked,setClicked]=useState(props.clicked);
//   let setClicked=props.setClicked;
//   // setClicked(!clicked);
//   // setClicked(!clicked);
//   console.log("clicked inside leftsidebar",clicked);

//   const handleClick=()=>{
//     setClicked(!clicked);
//   }
//   return (
//     <div className='left-sidebar'>
//         {/* LeftSidebar */}
//         <nav className='side-nav'>
//             <NavLink to='/' className='side-nav-links' activeClassName='active' >
//                     <p>Home</p>
//             </NavLink>
//             <div className='side-nav-div'>
//                 <div><p>PUBLIC</p></div>

//                 <NavLink to='/Questions' className='side-nav-links' activeClassName='active' >
//                     <img style={{width:"15px"}} src={Globe} alt='glob logo' />
//                     <p style={{paddingLeft:"10px"}}>Questions </p>
//                 </NavLink>

//                 <NavLink to='/Tags'  className='side-nav-links' activeClassName='active' style={{paddingLeft:"40px"}} >
//                 <p>Tags</p>
//                 </NavLink>

//                 <NavLink to='/Users'  className='side-nav-links' activeClassName='active' style={{paddingLeft:"40px"}} >
//                 <p>Users</p>
//                 </NavLink>

//             </div>
//         </nav>
//     </div>
//   )
// }



// export default LeftSidebar

import React, { useState } from 'react'
import './LeftSidebar.css'
import {NavLink} from 'react-router-dom' /*The links which uses at Nav*/
import Globe from '../../assets/globe.png'
const LeftSidebar = () => {
  return (
    <div className='left-sidebar'>
        {/* LeftSidebar */}
        <nav className='side-nav'>
            <NavLink to='/' className='side-nav-links' activeClassName='active' >
                    <p>Home</p>
            </NavLink>
            <div className='side-nav-div'>
                <div><p>PUBLIC</p></div>

                <NavLink to='/Questions' className='side-nav-links' activeClassName='active' >
                    <img style={{width:"15px"}} src={Globe} alt='glob logo' />
                    <p style={{paddingLeft:"10px"}}>Questions </p>
                </NavLink>

                <NavLink to='/Tags'  className='side-nav-links' activeClassName='active' style={{paddingLeft:"40px"}} >
                <p>Tags</p>
                </NavLink>

                <NavLink to='/Users'  className='side-nav-links' activeClassName='active' style={{paddingLeft:"40px"}} >
                <p>Users</p>
                </NavLink>

            </div>
        </nav>
    </div>
  )
}



export default LeftSidebar