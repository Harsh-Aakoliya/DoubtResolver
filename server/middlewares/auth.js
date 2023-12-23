//this file will be used in routes like suppose routes has request as router.post("/Ask",AskQuestion); in Question.js file of routes folder. so before calling AskQuestion we need to call auth function like router.post("/Ask",auth,AskQuestion); so basically first of all post request will call this auth function if there is no error then we are calling next() function which doing nothing but calling AskQuestion function


//this file will be check is there is any token or not if yes then furture check is it valid or not if it is valid then and only then we need to use controllers folder's function using this "next" function

import jwt from "jsonwebtoken"

const auth = (req,res,next)=>{
    try {
        const token =req.headers.authorization.split(" ")[1];   //here req.headers.authorization is string with value as req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("Profile")).token}`; (refer index.js file of api ) now after spliting it with space we got "Bearer" and "${JSON.parse(localStorage.getItem("Profile")).token" and extracting header ==> "${JSON.parse(localStorage.getItem("Profile")).token"


        //now at the time of creating file auth.js of controllers to increase security we have added highly secure this "test" in order to produce token like const token=jwt.sign({email:existinguser.email , id:existinguser._id},"test",{expiresIn:"1h"})  so now at this time we are verifying it here

        let decodeData = jwt.verify(token,process.env.JWT_SECRET);//now actully there is case like hacker can create face token and send request (if he/seh know the api request) now suppose if we not verifying at here what happens from frontend api request(in api folder index.js file) we can access controllers folder directly for each and every request now after inroducing this middleware first of all for all the request we need to verify it using "test " secrest that we have setted for each user at the time of sighuping but hacker is not trusted user and it's fack account not created via starnder process so that "test" secreat not added to that face users so by this way we can prevent to access all the req i.e. all the functionallity like postquestion, replay answer and all..


        //now we have successfully verified our roken now we can use next() function to access controllers folder 

        req.userId = decodeData?.id;
        next();

    } catch (error) {
        console.log(error);   
    }
}

export default auth;