import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, 
  Route, Navigate, BrowserRouter, Redirect} from "react-router-dom";

import './index.css';
import App from './App';
import Signup from './signup';
import Login from './login';
import Calculator from './calculator';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/App" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/calculator" element={<Calculator />} />
      // Default
      <Route path="/" element = {<App />}/>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
