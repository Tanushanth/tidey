import { useParams } from "react-router-dom";

const CourseDetails = () => {
  const { id } = useParams();

  return (
    <div className="App">
    <div className="course-details">
      <h2>Course details - { id }</h2>
    </div>



    </div>
  );
}
 
export default CourseDetails;