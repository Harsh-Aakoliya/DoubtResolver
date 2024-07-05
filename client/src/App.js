
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


function App(){
    // debugger
    const dispatch =useDispatch();
    // console.log(dispatch);
    useEffect(() => {
        dispatch(fetchAllQuestions({message:"App.js"})) //get request to database
        dispatch(fetchAllUsers());
        dispatch(fetchAllTags({message:"at app.js file"}));
    }, [dispatch]); //so in dependency array we have [dispatch] so when ever disptch will be used then it will call this fetchAllQuestions() 



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