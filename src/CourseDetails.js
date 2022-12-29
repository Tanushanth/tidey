import { useNavigate, useParams } from "react-router-dom";
import useFetch from './UseFetch';

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { data: courses, error, isPending } = useFetch('http://localhost:8000/courses/' + id);

  const handleClick = () => {
    fetch('http://localhost:8000/courses/' + courses.id, {
      method: 'DELETE'
    }).then (() => {
      navigate('/courses');
    })
  }


  return (
    <div className="App">
      <div className="course-header">

        <div className="course-details" style={ {fontSize: "calc(12px + 2vmin)"} }>
          { isPending && <div>Loading...</div>}
          { error && <div>{ error }</div>}
          { courses &&  (
              <article>
                <h2> { courses.courseCode } </h2>
                <p> {  courses.courseName } </p>
                <button onClick={handleClick}>Delete course</button>
              </article>
            )
          }
          
        </div>

      </div>
    </div>
  );
}
 
export default CourseDetails;