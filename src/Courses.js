import CourseList from './CourseList';
import useFetch from './UseFetch';
import { Link, useNavigate } from "react-router-dom";
import {useEffect, useState} from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
const Courses = () => {
  const [ userID, setUserID ] = useState();
  const auth = getAuth();
  const navigate = useNavigate();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserID(user.uid)
    } 
  });
  {/*const { data: courses, isPending, error } = useFetch('http://localhost:8000/courses');*/}
  useEffect(() => {
    console.log(userID);
    if(userID == "undefined"){
      
      navigate("../tidey");
      
    }
  }, [userID])
  
  return (
    <div>
    <h2 className="course-header">All courses</h2>
    
      <header className="App-header">
        <div className="course-container">
          <CourseList/>
        </div>

        <div className="add-course">
        <div className="main-btn-container">
          <div className="main-btn">
            <div className="main-btn-content">
              <Link to="../tidey/Create" style={{ color: '#FFF', textDecoration: "none" }}>Add a new course</Link>
            </div>
          </div>
        </div>
        </div>
        
      </header>
      </div>
  );
}

export default Courses;
