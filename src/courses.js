import CourseList from './CourseList';
import useFetch from './UseFetch';
import { Link } from "react-router-dom";
const Courses = () => {
  
  {/*const { data: courses, isPending, error } = useFetch('http://localhost:8000/courses');*/}

  return (
    <div>
    <h2 className="course-header">All courses</h2>
    
      <header className="App-header">
        <div className="course-container">
          <CourseList/>
        </div>

        <div className="main-btn-container">
          <div className="main-btn">
            <div className="main-btn-content">
            <Link to="../Create" style={{ color: '#FFF', textDecoration: "none" }}>Add a new course</Link>
            </div>
          </div>
        </div>
        
      </header>
      </div>
  );
}

export default Courses;