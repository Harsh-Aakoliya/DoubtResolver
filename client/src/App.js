
import {BrowserRouter as Router} from 'react-router-dom'

import './App.css'
import Navbar from './components/Navbar/Navbar'
import AllRoutes from './AllRoutes';


function App(){
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