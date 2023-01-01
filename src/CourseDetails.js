import { useNavigate, useParams } from "react-router-dom";
import useFetch from './UseFetch';
import { useState } from 'react';
import Tabs from './Tabs';
import Modal from 'react-bootstrap/Modal';


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


const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ showModal, setShow ] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { data: courses, error, isPending } = useFetch('http://localhost:8000/courses/' + id);

  const handleDelete = () => {
    fetch('http://localhost:8000/courses/' + courses.id, {
      method: 'DELETE'
    }).then (() => {
      navigate('/courses');
    })
  }
  

  return (
    <div className="App">
      < Tabs />

      <div className="App-header" style={{ minHeight: "82vh" }}>
      
        <div className="course-details" style={ {fontSize: "calc(12px + 2vmin)"} }>
          { isPending && <div>Loading...</div>}
          { error && <div>{ error }</div>}
          { courses &&  (
              <article>
                  <h2> { courses.courseCode } </h2>
                  <p> { courses.courseName } </p>
                
                <button 
                  onClick={ handleShow }>
                    Delete course
                </button>
                
                <Modal show={ showModal } onHide={ handleClose } style={ modalStyle }>
                  <Modal.Header  style={ modalHeaderStyle }>
                    <Modal.Title>Delete Confirmation</Modal.Title>
                  </Modal.Header>
                  <Modal.Body style={ modalBodyStyle }>Are you sure you want to delete this course?</Modal.Body>
                  <Modal.Footer style={ modalFooterStyle }>
                    <button variant="secondary" onClick={ handleDelete } style={{ marginRight: "20px"}}>
                      Yes
                    </button>
                    <button variant="primary" onClick={ handleClose }>
                      No
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