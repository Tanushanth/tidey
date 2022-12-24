import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, 
  Route, Navigate, BrowserRouter, Redirect} from "react-router-dom";

import './index.css';
import App from './App';
import Navbar from './Navbar';
import Home from './Home';


import Signup from './Signup';
import Login from './Login';
import Calculator from './Calculator';
import Courses from './Courses';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/App" element={<App />} />
      <Route path="/Navbar" element={<Navbar />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/Calculator" element={<Calculator />} />
      <Route path="/Courses" element={<Courses />} />
      // Default
      <Route path="/" element = {<App />}/>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
