import { useNavigate, useParams } from "react-router-dom";
import useFetch from './UseFetch';
import Tabs from './Tabs';
import Modal from 'react-bootstrap/Modal';
import { updateDoc } from "firebase/firestore";
import {db} from "./Firebase";
import {useState, useEffect} from 'react';
import {collection, getDocs, addDoc, doc, getDoc, deleteDoc} from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ref, uploadBytes, listAll, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from './Firebase';

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
  const [ userID, setUserID ] = useState();



  const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserID(user.uid)
      } 
    });

	const fileListRef = ref(storage, `${userID}/${id}`);




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
    navigate("../Courses")

    listAll(fileListRef).then((response) => {
			response.items.forEach((item) => {
				getDownloadURL(item).then((url) => {
						deleteObject(item).then(() => {
							console.log("Deleted!")
							return;
						})
				});	
			});
		});
  }

  const updateCourse = async () => {
    const docRef = doc(db, "courses", id);
    await updateDoc( docRef , {courseCode: courseCode, courseName: courseName});
    setEditShow(false);
    navigate("../Courses");
  };


  return (
    <div className="App">
      < Tabs />

      <div className="App-header" style={{ minHeight: "83vh" }}>
      
        <div className="course-details" style={ {fontSize: "calc(12px + 2vmin)"} }>
          { currentCourse &&  (
              
              <article>
                  <h2> { currentCourse.courseCode } </h2>
                  <p style={{ fontFamily: "'Great Vibes'"  }}> { currentCourse.courseName } </p>
         
            <div className="main-btn-container">
                <div className="main-btn"
                  onClick={ handleShow } >
                    <div className="main-btn-content" style={{ cursor: "pointer" }}>
                    Delete course
                    </div>
                </div>

                <div className="main-btn"
                  onClick={ handleEditShow }>
                    <div className="main-btn-content" style={{ cursor: "pointer" }}>
                    Edit course
                    </div>
                </div>
                </div>
                
                <Modal show={ showDeleteModal } onHide={ handleClose } className="modal">
                  <Modal.Header  className="modal-header">
                    <Modal.Title>Delete Confirmation</Modal.Title>
                  </Modal.Header>
                  <Modal.Body className="modal-body">Are you sure you want to delete this course?</Modal.Body>
                  <Modal.Footer className="modal-footer">
                    <button variant="secondary" onClick={ handleDelete } className="modal-btn">
                      Yes
                    </button>
                    <button variant="primary" onClick={ handleClose } className="modal-btn">
                      No
                    </button>
                  </Modal.Footer>
                </Modal>

                
                <Modal show={ showEditModal } onHide={ handleClose } className="modal">
                  <Modal.Header className="modal-header">
                    <Modal.Title>Edit Course</Modal.Title>
                  </Modal.Header>
                  <Modal.Body className="modal-body">Fill in the inputs with your changes</Modal.Body>
                  <Modal.Footer className="modal-footer">
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
                      className="modal-btn"
                    >
                        Save
                    </button>

                    <button 
                      onClick={ handleEditCancel }
                      className="modal-btn"
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