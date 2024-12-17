
import {BrowserRouter as Router} from 'react-router-dom'

import './App.css'
import Navbar from './components/Navbar/Navbar'
import AllRoutes from './AllRoutes';


//for displying all the question to home 
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAllQuestions } from './actions/question';

//for displaying all the users when our application starts
import { fetchAllUsers } from './actions/users';
import { fetchAllTags } from './actions/tags';

import axios from 'axios';

// const SERVER_BASE_URL="http://localhost:5000"
const SERVER_BASE_URL="https://stackoverflow-clone-bf06.onrender.com"

function App(){
    // debugger
    const dispatch =useDispatch();
    // console.log(dispatch);
    useEffect(() => {
        dispatch(fetchAllQuestions({message:"App.js"})) //get request to database
        dispatch(fetchAllUsers());
        dispatch(fetchAllTags({message:"at app.js file"}));
    }, [dispatch]); //so in dependency array we have [dispatch] so when ever disptch will be used then it will call this fetchAllQuestions() 

    useEffect(() => {
        const trackVisitor = async () => {
          try {
            // Check if this visitor has already been tracked today
            const lastVisit = localStorage.getItem("lastVisit");
            const today = new Date().toISOString().split("T")[0];
    
            if (lastVisit !== today) {
                console.log("incremented the visitor")
              // Call the increment-view endpoint
              await axios.post(`${SERVER_BASE_URL}/increment-view`);
              // Store today's date to prevent multiple calls
              localStorage.setItem("lastVisit", today);
            }
            else{
                console.log("You already visited the website");
            }
          } catch (error) {
            console.error("Error tracking visitor:", error);
          }
        };
    
        trackVisitor();
      }, []);

    return (
    <div className='App'>
        <Router>
            <Navbar/>
            <AllRoutes/>
        </Router>
    </div>
    );
}
export default App;