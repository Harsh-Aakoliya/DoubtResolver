import React from 'react'
import Home from './pages/Home/Home'
import Auth from './pages/Auth/Auth'
import { Routes,Route } from 'react-router-dom'
import Questions from './pages/Questions/Questions'
import AskQuestion from './pages/AskQuestion/AskQuestion'
import DisplayQuestion from './pages/Questions/DisplayQuestion'
import Tags from "./pages/Tags/Tags"
import Users from "./pages/Users/Users"
import UserProfile from './pages/UserProfile/UserProfile'
const AllRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/Auth' element={<Auth/>}></Route>
            <Route path='/Questions' element={<Questions/>}></Route>
            <Route path='/AskQuestion' element={<AskQuestion/>}></Route>
             {/* he said /:id can be anything like any number of digits */}
            <Route path='/Questions/:id' element={<DisplayQuestion/>}></Route>
            {/* for tags page */}
            <Route path="/Tags" element={<Tags />}/>

            {/* for all the users page */}
            <Route path="/Users" element={<Users />}/>

            {/* for specific user page */}
            <Route path="/Users/:id" element={<UserProfile />}></Route>
        </Routes>

    </div>
  )
}

export default AllRoutes