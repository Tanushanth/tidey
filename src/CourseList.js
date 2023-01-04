import { Link } from 'react-router-dom';
import { db } from './Firebase';
import {useState, useEffect} from 'react';
import {collection, getDocs, addDoc} from 'firebase/firestore';
const courseStyle = {
    textDecoration: "none",
    color: 'white'
}

const CourseList = () => {
    const [courses, setCourses] = useState();
    const coursesCollectionRef = collection(db, "courses");

    useEffect(() => {
        const getCourses = async () => {
            
            const data = await getDocs(coursesCollectionRef);
            setCourses(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
            
            
        };
        
        getCourses();
    }, []);

    return ( 
       
        <div className="course-list" style={{ fontSize: "calc(12px + 2vmin)" }}>
            {courses && courses.map((course) => (
                
                <div className="course-preview">
                    <Link to={`/Courses/${course.id} `} style={ courseStyle }>
                        <h2>{ course.courseCode }</h2>
                        <p>{ course.courseName }</p>
                    </Link>
                </div>
                
            ))}

        </div>

        /*
        <div className="course-list" style={{ fontSize: "calc(12px + 2vmin)" }}>
            {courses.map((course) => (
                <div className="course-preview" key={ course.id }>
                    <Link to={`/Courses/${course.id} `} style={ courseStyle }>
                        <h2>{ course.courseCode }</h2>
                        <p>{ course.courseName }</p>
                    </Link>
                </div>
            ))}

        </div>
        */

    );
}
 
export default CourseList;