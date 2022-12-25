import './App.css';
import Navbar from './Navbar';
import CourseList from './CourseList';
import useFetch from './UseFetch';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import anime from "animejs/lib/anime.es.js"



const Courses = () => {
  const { data: courses, isPending, error } = useFetch('http://localhost:8000/courses');

  
  return (
    <div className="App">
    <Navbar />
      

      <header className="App-header">
      <h3>All courses</h3>
        <div className="course-container">
          { error && <div>{ error }</div>}
          { isPending && <div>Loading...</div>}
          {courses && <CourseList courses={courses} /> }
        </div>

        <button>
        <Link to="../Create" style={{ color: '#FFF' }}>Add a new course</Link>
        </button>
        
      </header>


    </div>
  );
}

export default Courses;