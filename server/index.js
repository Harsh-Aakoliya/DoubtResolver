import express from "express";
import mongoose from "mongoose"; //1)importing mongoose to do CRUD operation
import cors from "cors";
//10)  for authentication we need to import user.js file
import userRoutes from "./routes/user.js"
import questionRoutes from "./routes/Questions.js"
import answerRoutes from "./routes/Answers.js"



//for email
import users from "./models/auth.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import nodemailer from "nodemailer"



// this is for deployment
import dotenv from "dotenv"

//2) To create express server we just need to write → const app=express(); so now out app will be express server
const app=express();
dotenv.config();


//3) app.use(express.json( { limit : “30mb” ,extended: true } ) → since our backend is rest-api so all the request will be in form of json only with given limit but we can extend it also because we set extended: true
app.use(express.json({limit :"50mb" ,extended: true }));
app.use(express.urlencoded({limit :"50mb" ,extended: true }));
app.use(cors());

app.get("/",(req,res)=>{
    res.send("this is stack overflow clone API");
});

//9) now one thing is that same as above there can be many request and to write here in one file will be messing so we need to create one folder named as routes which can handle it and after importing that file in to here we can use it as below
app.use("/user",userRoutes);
app.use("/questions",questionRoutes); //url will be "localhost:3000/questions/get" for getting data from data base
app.use("/answer",answerRoutes);


app.post("/Forgotpassword",async (req,res)=>{
    const {email}=req.body;
    console.log(email);
    await users.findOne({email:email})
    .then(user=>{
        if(!user){
            return res.send({Status: "User not existed from backend"});
        }
        // alert("mail send");
        console.log("a;slkfjas;dlkfja;sdkfja;sldjfa;sdfja;sdkjf");
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "1d"})
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'harshaakoliya20@gmail.com',
              pass: "fsfu xhpj zqpq jawn"
            }
          });
          

          var mailOptions = {
            from: 'harshaakoliya20@gmail.com',
            to: user.email,
            subject: 'Reset Password Link', 
            // text: `https://doubt-resolver.netlify.app/reset_password/${user._id}/${token}`
            text: `http://localhost:3000/reset_password/${user._id}/${token}`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              return res.send({Status: "Success"})
            }
          });
    })
})

app.post("/reset_password/:id/:token",async(req,res)=>{
    const {id,token}=req.params;
    const {password}=req.body;
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err) {
            return res.json({Status: "Error with token"})
        } else {
          console.log("new password with out hash is ",password);
          bcrypt.hash(password, 12)
            .then(hash => {
               users.findByIdAndUpdate({_id: id}, {password: hash})
                .then(u => {
                  res.send({Status: "Success"})
                  console.log("updated successfully ");
                })
                .catch(err => res.send({Status: err}))
            })
            .catch(err => res.send({Status: err}))
        }
    })

})

//4) finding avilable port in environment if not any avilable then need to assign as 5000 which is of server's port
const PORT=process.env.PORT || 5000;

//5) now goto mongoDB atlas and create project for the same
//6) create neccesory folders like models, controllers, middlewares and routes


// const CONNECTION_URL="mongodb+srv://admin:admin@stack-overflow-colne.n4gekxe.mongodb.net/?retryWrites=true&w=majority"

const DATABASE_URL=process.env.CONNECTION_URL


//7) 
mongoose.connect(DATABASE_URL,{useNewUrlParser:true ,useUnifiedTopology:true})
    .then(()=>app.listen(PORT,()=>{
        console.log(`server is running on ${PORT}`);
    }))
    .catch((err)=>console.log(err.message));//if there is any error from database then it will show to server terminal

//8) now if we run npm start in server directory it will show that server is running on 5000 and now in broweser also if we goto url localhost:5000 we can see that there is written --> this is stack overflow clone API because we are requesting only localhost:5000 without any furture url like (localhost:5000/admin/signup/...) etc so as above on 5) we have declared for "/" we are getting response as --> this is stack overflow clone API