import { useParams } from "react-router-dom";
import Navbar from './Navbar';

const CourseDetails = () => {
  const { id } = useParams();

  return (
    <div className="App">
    <Navbar />
    <div className="course-details">
      <h2>Course details - { id }</h2>
    </div>



    </div>
  );
}
 
export default CourseDetails;