import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, 
  Route, Navigate, BrowserRouter, Redirect} from "react-router-dom";

import './index.css';
import App from './App';
import Navbar from './Navbar';
import Home from './Home';
import Signup from './signup';
import Login from './login';
import Calculator from './calculator';
import Courses from './courses';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/App" element={<App />} />
      <Route path="/Navbar" element={<Navbar />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/calculator" element={<Calculator />} />
      <Route path="/courses" element={<Courses />} />
      // Default
      <Route path="/" element = {<App />}/>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
