import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, 
  Route, Navigate,} from "react-router-dom";

import './index.css';
import App from './App';
import signup from './signup';
import login from './login';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <signup />
    <login />
  </React.StrictMode>
);

function index() {
  return (
    <>
      {/* This is the alias of BrowserRouter i.e. Router */}
      <Router>
        <Routes>
          {/* This route is for home component 
          with exact path "/", in component props 
          we passes the imported component*/}
          <Route exact path="/App" component={<App/>} />
            
          {/* This route is for about component 
          with exact path "/about", in component 
          props we passes the imported component*/}
          <Route path="/login" component={<login/>} />
            
          {/* This route is for contactus component
          with exact path "/contactus", in 
          component props we passes the imported component*/}
          <Route path="/signup" component={<signup/>} />
            
          {/* If any route mismatches the upper 
          route endpoints then, redirect triggers 
          and redirects app to home component with to="/" */}
          <Navigate to="/App" />
        </Routes>
      </Router>
    </>
  );
}
  
export default index;
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
