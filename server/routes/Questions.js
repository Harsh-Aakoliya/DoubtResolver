import express from "express";

import {AskQuestion} from "../controllers/Questions.js";
import {getAllQuestions} from "../controllers/Questions.js";
import {deleteQuestion} from "../controllers/Questions.js";

//for up and down vote
import { voteQuestion } from "../controllers/Questions.js";


//for middleware folder
import auth from "../middlewares/auth.js"
//now here for post,delete and patch request we need to use auth.js middleware but for get request which is nothing but to see question we don't need it because without login we can see the question


const router = express.Router();


router.post("/Ask",auth,AskQuestion);//1)we are sending data to database using this route. 2) like suppose routes has request as router.post("/Ask",AskQuestion); in Question.js file of routes folder. so before calling AskQuestion we need to call auth function like router.post("/Ask",auth,AskQuestion); so basically first of all post request will call this auth function if there is no error then we are calling next() function IN auth.js of middleware which doing nothing but calling AskQuestion function
router.get("/get",getAllQuestions); //we are retriving all the existing question from datebase to display to frontend
router.delete("/delete/:id",auth,deleteQuestion)//we are requesting using delete request and along with url we are passing id of particular question that we wants to delete using deleteQuestion function which is there in controllers folder Questions.js file
router.patch("/vote/:id",auth,voteQuestion)

export default router;