//this file is for authentication request

import express from "express";
import {login,signup} from '../controllers/auth.js'

//for Users page
import {getAllUsers} from "../controllers/users.js";


//importing middleware
import auth from "../middlewares/auth.js"
//controller for updating profile
import {updateProfile} from "../controllers/users.js"
import { updateFollowers } from "../controllers/users.js";


const router=express.Router();


//10) if request is like "/user/signup" then below callback function will be called because at comment 9)  in index.js file we have used app.use("/user",userRoutes);

//now insted of writing what function we need to do here we can create one folder as controller in which all the functions will be there 
router.post('/signup',signup);
// 11) now to create signup function we have to go to auth.js file in controller folder because it is located at there

//if request is like "/user/login" then below callback function will be called because at comment 9) in index.js file we have used app.use("/user",userRoutes);
router.post('/login',login);



//for Users page
router.get("/getAllUsers",getAllUsers);


//for changing profile of user
router.patch("/update/profile/:id",auth,updateProfile);

router.patch("/update/followers",auth,updateFollowers)


export default router;