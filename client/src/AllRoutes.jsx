import React from 'react'
import Home from './pages/Home/Home'
import Auth from './pages/Auth/Auth'
import { Routes,Route } from 'react-router-dom'
import Questions from './pages/Questions/Questions'
import AskQuestion from './pages/AskQuestion/AskQuestion'
import DisplayQuestion from './pages/Questions/DisplayQuestion'
const AllRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/Auth' element={<Auth/>}></Route>
            <Route path='/Questions' element={<Questions/>}></Route>
            <Route path='/AskQuestion' element={<AskQuestion/>}></Route>
             {/* he said /:id can be anything like any number of digits */}
            <Route path='/Question/:id' element={<DisplayQuestion/>}></Route>
        </Routes>
    </div>
  )
}

export default AllRoutes