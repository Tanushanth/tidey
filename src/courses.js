import CourseList from './CourseList';
import useFetch from './UseFetch';
import { Link } from "react-router-dom";

const Courses = () => {
  const { data: courses, isPending, error } = useFetch('http://localhost:8000/courses');

  return (
    <div className="App">
  
      <header className="App-header">
      <h3>All courses</h3>
        <div className="course-container">
          <div className="grid">
          { error && <div>{ error }</div>}
          { isPending && <div>Loading...</div>}
          {courses && <CourseList courses={courses} /> }
          </div>
        </div>

        <button>
        <Link to="../Create" style={{ color: '#FFF' }}>Add a new course</Link>
        </button>
        
      </header>


    </div>
    
  );
}

export default Courses;