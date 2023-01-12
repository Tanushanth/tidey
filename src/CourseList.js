import { Link } from 'react-router-dom';
import { db } from './Firebase';
import {useState, useEffect} from 'react';
import {collection, getDocs, addDoc} from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {animationControls, motion, useAnimation} from 'framer-motion';
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
    const dragRef = useRef(null);
    const xPos = useRef(0);
    const animation = useAnimation();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserID(user.uid)
  
      } 
    });

    const handleLeftSwipe = () => {
        const newXPosition = xPos.current + 300;

        animation.start({
            x: newXPosition > (carouselWidth * 1.1) ? (carouselWidth * 1.1): newXPosition,
        });
    }

    const handleRightSwipe = () => {
        const newXPosition = xPos.current - 300;

        animation.start({
            x: newXPosition > -(carouselWidth * 1.1) ? -(carouselWidth * 1.1) : newXPosition,
        });
    }

    const onUpdate = (latest) => {
        xPos.current = latest.x;
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
                
                <motion.div 
                    drag = "x" 
                    dragConstraints =  {{right: (carouselWidth * 1.1), left: -(carouselWidth * 1.1)}} 
                    className = "course-inner-carousel"
                    animate = {animation}
                    ref = {dragRef}
                >
                    {courses && courses.map((course) => {
                        return(
                            <motion.div>
                                {course.userID === userID &&
                                
                                    <div>
                                        
                                            <div className="course-preview" >  
                                                <Link to={`/tidey/Courses/${course.id} `} style={ courseStyle }>                                                      
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