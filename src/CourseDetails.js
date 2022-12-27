import { useParams } from "react-router-dom";
import useFetch from './UseFetch';

const CourseDetails = () => {
  const { id } = useParams();
  const { data: courses, error, isPending } = useFetch('http://localhost:8000/courses/' + id);

  return (
    <div className="App">
      <div className="App-header">

        <div className="course-details" style={ {fontSize: "calc(12px + 2vmin)"} }>
          { isPending && <div>Loading...</div>}
          { error && <div>{ error }</div>}
          { courses &&  (
              <article>
                <h2> { courses.courseCode } </h2>
                <p> {  courses.courseName } </p>
              </article>
            )
          }
          
        </div>

      </div>
    </div>
  );
}
 
export default CourseDetails;