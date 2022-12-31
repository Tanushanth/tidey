import { Link } from 'react-router-dom';

const courseStyle = {
    textDecoration: "none",
    color: 'white'
}

const CourseList = ({ courses }) => {

    return ( 
        <div className="course-list">
            {courses.map((course) => (
                <div className="course-preview" key={ course.id }>
                    <Link to={`/Courses/${course.id} `} style={ courseStyle }>
                        <h2>{ course.courseCode }</h2>
                        <p>{ course.courseName }</p>
                    </Link>
                </div>
            ))}

        </div>
    );
}
 
export default CourseList;