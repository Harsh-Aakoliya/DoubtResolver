
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

function App(){

    const dispatch =useDispatch();
    useEffect(() => {
        dispatch(fetchAllQuestions()) //get request to database
        dispatch(fetchAllUsers());
    }, [dispatch]); //so in dependency array we have [dispatch] so when ever disptch will be used then it will call this fetchAllQuestions() 




    return (
    <div className='App'>
        <Router>
            <Navbar/>
            {/* <h1>alkjsd;fakjlsdf;aksjd;flkajsd;flkjas;dlfja;sldjfa;sdkjf</h1>
            <h1>alkjsd;fakjlsdf;aksjd;flkajsd;flkjas;dlfja;sldjfa;sdkjf</h1>
            <h1>This is for home</h1> */}

            {/* here there will be many routes but to not do mess up we are creating one AllRoutes componets to deal with all the Routes  */}
            <AllRoutes/>
        </Router>
    </div>
    );
}
export default App;