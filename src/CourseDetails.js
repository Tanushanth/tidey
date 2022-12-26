import { useParams } from "react-router-dom";

const CourseDetails = () => {
  const { id } = useParams();

  return (
    <div className="course-details">
      <h2>Course details - { id }</h2>
    </div>
  );
}
 
export default CourseDetails;