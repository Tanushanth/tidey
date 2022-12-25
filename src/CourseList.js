const CourseList = ({ courses }) => {

    return ( 
        <div className="course-list">
            {courses.map((course) => (
                <div className="course-preview">
                    <h2> { course.courseCode } </h2>
                    <p> { course.courseName } </p>
                </div>
            ))}

        </div>
    );
}
 
export default CourseList;