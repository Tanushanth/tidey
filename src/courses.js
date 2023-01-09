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

        <button>
          <Link to="../Create" style={{ color: '#FFF', textDecoration: "none" }}>Add a new course</Link>
        </button>
        
      </header>
      </div>
  );
}

export default Courses;