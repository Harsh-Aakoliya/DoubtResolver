// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';

// //16) for backend of authentication(Redux)
// import { Provider } from 'react-redux';
// import { createStore,applyMiddleware,compose } from 'redux';
// // import {configureStore} from "@reduxjs/toolkit";
// import thunk from 'redux-thunk'

// // 17) so here instead of writting all the reducer we can create another file name as index.js in reducers which have all the reducers 
// import  Reducers  from './reducers';
// import { composeWithDevTools } from 'redux-devtools-extension';
// const composedEnhancer = compose(applyMiddleware(thunk),composeWithDevTools())

// // const store = createStore(rootReducer, undefined, composedEnhancer)
// const store = createStore(Reducers,composedEnhancer);


// // const store=createStore(Reducers,compose(applyMiddleware(thunk)));
// console.log("inside index.js of src folder",store)

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <Provider store={store}>
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>
//    </Provider>
// );
// export default store;



import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

//16) for backend of authentication(Redux)
import { Provider } from 'react-redux';
import { createStore,applyMiddleware,compose } from 'redux';
// import {configureStore} from "@reduxjs/toolkit";
import thunk from 'redux-thunk'

// 17) so here instead of writting all the reducer we can create another file name as index.js in reducers which have all the reducers 
import  Reducers  from './reducers';

const store=createStore(Reducers,compose(applyMiddleware(thunk)));


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
   </Provider>
);

export default store;