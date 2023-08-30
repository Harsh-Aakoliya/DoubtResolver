//this file is for authentication request

import express from "express";
import {login,signup} from '../controllers/auth.js'

const router=express.Router();


//10) if request is like "/user/signup" then below callback function will be called because at comment 9)  in index.js file we have used app.use("/user",userRoutes);

//now insted of writing what function we need to do here we can create one folder as controller in which all the functions will be there 
router.post('/signup',signup);
// 11) now to create signup function we have to go to auth.js file in controller folder because it is located at there

//if request is like "/user/login" then below callback function will be called because at comment 9) in index.js file we have used app.use("/user",userRoutes);
router.post('/login',login);

export default router;