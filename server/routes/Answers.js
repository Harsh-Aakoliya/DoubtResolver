import express from "express";

import {postAnswer} from "../controllers/Answers.js"

//for deleting answer
import {deleteAnswer} from "../controllers/Answers.js";

//for middleware
import auth from "../middlewares/auth.js";

const router=express.Router();

// now so far for posting data we have used post method so it actually creates new record to data base and get method to get existing data from data base now for answering existing question we need to change database record(not create new , not retriving existing. we are modifying DB) so that answer can be store at that record and at the time of dispatching we can display all answers
router.patch("/post/:id",auth,postAnswer) //here suppose question url is like http://localhost:3000/Question/64f41b442d775c90e8f2c5c8 then :id wil be 64f41b442d775c90e8f2c5c8 which we are getting from frontend. so post/:id url will be posted answer for :id = 64f41b442d775c90e8f2c5c8. so whole part will be like for given route /post/:id we need to change DB(bcz of patch) using function PostAnwer which is written in controllers folder Answers.js file 


//for deleting question's answer from DB here deleting question's answer means we are removing answer key from database (chang in DB so we need to use patch request)
router.patch("/delete/:id",auth,deleteAnswer);

export default router;