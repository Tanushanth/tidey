import { Link } from 'react-router-dom';
import { db } from './Firebase';
import {useState, useEffect} from 'react';
import {collection, getDocs, addDoc} from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {motion} from 'framer-motion';
import {useRef} from "react";
import {ChevronsLeft, ChevronsRight} from 'react-feather';
const courseStyle = {
    textDecoration: "none",
    color: 'white'
}

const CourseList = () => {
    const [courses, setCourses] = useState();
    const coursesCollectionRef = collection(db, "courses");
    const [userID, setUserID] = useState('');
    const [carouselWidth, setCarouselWidth] = useState();
    const carousel = useRef();
    const auth = getAuth();
    const swipeString = "<<< SWIPE"
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserID(user.uid)
  
      } 
    });

    const handleLeftSwipe = () => {
                
    }

    const handleRightSwipe = () => {

    }

    useEffect(() => {
        
        const getCourses = async () => {
            
            const data = await getDocs(coursesCollectionRef);
            
            setCourses(data.docs.map((doc) => ({...doc.data()})));
            //id: doc.id
            
        };
        
        getCourses();
    }, []);
    useEffect(() => {
        setCarouselWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }, [courses])
    return ( 

            <motion.div ref = {carousel} className = "course-carousel">
                
                <motion.div drag = "x" dragConstraints =  {{right: 0, left: -carouselWidth}} className = "course-inner-carousel">
                    {courses && courses.map((course) => {
                        return(
                            <motion.div>
                                {course.userID === userID &&
                                
                                    <div>
                                        
                                            <div className="course-preview" >  
                                                <Link to={`/Courses/${course.id} `} style={ courseStyle }>                                                      
                                                    <div className = "courseInfo">
                                                        <h2>{ course.courseCode }</h2>
                                                    
                                                        <p>{ course.courseName }</p>
                                                    </div>
                                                </Link>
                                            </div>              
                                        
                                    </div>
                                    
                                }
                            </motion.div>
                            );
                        })}
            
                </motion.div>
                <div className = "swipe-text">
                    
                    <ChevronsLeft color = '#4ccbf9' onClick={ handleLeftSwipe }></ChevronsLeft>
                    <p>SWIPE</p>
                    <ChevronsRight color = '#4ccbf9' onClick={ handleRightSwipe }></ChevronsRight>
                    
                </div>
            </motion.div>
    );
}
 
export default CourseList;