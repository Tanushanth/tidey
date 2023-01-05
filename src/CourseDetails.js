import { useNavigate, useParams } from "react-router-dom";
import useFetch from './UseFetch';
import Tabs from './Tabs';
import Modal from 'react-bootstrap/Modal';
import { updateDoc } from "firebase/firestore";
import {db} from "./Firebase";
import {useState, useEffect} from 'react';
import {collection, getDocs, addDoc, doc, getDoc, deleteDoc} from 'firebase/firestore';


const modalStyle = {
  position: "fixed",
  fontFamily: "'Quicksand', sans-serif",
  zIndex: "-100px",
  top: "10%",
  left: "50%",
  width: "500px",
  marginLeft: "-260px",
  backgroundColor: 'white',
  border: "1px solid #999",
  borderRadius: "6px",
  boxShadow: "0 3px 7px rgba(0,0,0,0.3))",
  outline: "none",
  fontWeight: "bold"
}

const modalHeaderStyle = {
  padding: "9px 15px",
  borderBottom: "1px solid #eee",
}

const modalBodyStyle = {
  position: "relative",
  overflowY: "auto",
  maxHeight: "400px",
  padding: "15px"
}
  
const modalFooterStyle = {
  padding: "14px 15px 15px",
  marginBottom: "0",
  textAlign: "right",
  backgroundColor: "#f5f5f5",
  borderTop: "1px solid #ddd",
  borderRadius: "0 0 6px 6px",
  boxShadow: "inset 0 1px 0 @white",
}

const modalBtn = {
  background: "#2596be",
  fontWeight: "bold",
  color: "#fff",
  border: "0",
  padding: "8px",
  borderRadius: "8px",
  cursor: "pointer",
  marginRight: "20px"
}

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ courseCode, setCourseCode] = useState( "New Course Code");
  const [ courseName, setCourseName] = useState("New Course Name");

  const [ showDeleteModal, setDeleteShow ] = useState(false);
  const [ showEditModal, setEditShow ] = useState(false);

  const handleClose = () => setDeleteShow(false);
  const handleShow = () => setDeleteShow(true);
  const handleEditShow = () => setEditShow(true);
  const handleEditCancel= () => setEditShow(false);
  
  const [courses, setCourses] = useState();
  const coursesCollectionRef = collection(db, "courses");
  const [currentCourse, setCurrentCourse] = useState();

  useEffect(() => {
      const getCourses = async () => {
          
          const data = await getDocs(coursesCollectionRef);
          setCourses(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
          
          
      };
      const getCurrentCourse = async () =>{
        const docRef = doc(db, "courses", id);
        const docSnap = await getDoc(docRef);
        setCurrentCourse({...docSnap.data(), id: docSnap.id});
      }
      
      getCourses();
      getCurrentCourse();

      
      
      
  }, []);
  const handleDelete = async () => {

    const docRef = doc(db, "courses", id);
    await deleteDoc(docRef);
    navigate(-1)
  }

  const updateCourse = async () => {
    const docRef = doc(db, "courses", id);
    await updateDoc( docRef , {courseCode: courseCode, courseName: courseName});
    setEditShow(false);
    navigate(-1);
  };


  return (
    <div className="App">
      < Tabs />

      <div className="App-header" style={{ minHeight: "80vh" }}>
      
        <div className="course-details" style={ {fontSize: "calc(12px + 2vmin)"} }>
          { currentCourse &&  (
              
              <article>
                  <h2> { currentCourse.courseCode } </h2>
                  <p> { currentCourse.courseName } </p>
         
                <button 
                  onClick={ handleShow }
                  style={{ marginRight: "20px" }} >
                    Delete course
                </button>

                <button 
                  onClick={ handleEditShow }>
                    Edit course
                </button>
                
                <Modal show={ showDeleteModal } onHide={ handleClose } style={ modalStyle }>
                  <Modal.Header  style={ modalHeaderStyle }>
                    <Modal.Title>Delete Confirmation</Modal.Title>
                  </Modal.Header>
                  <Modal.Body style={ modalBodyStyle }>Are you sure you want to delete this course?</Modal.Body>
                  <Modal.Footer style={ modalFooterStyle }>
                    <button variant="secondary" onClick={ handleDelete } style={ modalBtn }>
                      Yes
                    </button>
                    <button variant="primary" onClick={ handleClose } style={ modalBtn }>
                      No
                    </button>
                  </Modal.Footer>
                </Modal>

                
                <Modal show={ showEditModal } onHide={ handleClose } style={ modalStyle }>
                  <Modal.Header  style={ modalHeaderStyle }>
                    <Modal.Title>Edit Course</Modal.Title>
                  </Modal.Header>
                  <Modal.Body style={ modalBodyStyle }>Fill in the inputs with your changes</Modal.Body>
                  <Modal.Footer style={ modalFooterStyle }>
                    <input 
                      type="text" 
                      required
                      value={ courseCode } 
                      style={{ marginRight: "20px"}}
                      onChange={(e) => setCourseCode(e.target.value)}
                    />
                      
                    <input 
                      type="text" 
                      value={ courseName } 
                      required
                      style={{ marginRight: "20px", marginBottom: "20px"}}
                      onChange={(e) => setCourseName(e.target.value)}
                    />

                    <button 
                      onClick={ updateCourse }
                      style={ modalBtn }
                    >
                        Save
                    </button>

                    <button 
                      onClick={ handleEditCancel }
                      style={ modalBtn }
                    >
                        Cancel
                    </button>
                  </Modal.Footer>
                </Modal>
          


                
              </article>
            )
          }
          
        </div>

      </div>
    </div>
  );
}
 
export default CourseDetails;