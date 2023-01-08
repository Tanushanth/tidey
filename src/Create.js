import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {db} from './Firebase';
import {collection, getDocs, addDoc, doc, updateDoc, setDoc} from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from "firebase/auth";
const Create = () => {
  const [courseCode, setCourseCode] = useState('');
  const [courseName, setCourseName] = useState('');
  const [gradeList, setGradeList] = useState([{ desc: "", weight: "", grade: ""}]);
  const [fileNameList, setFileNameList] = useState([{ name: "" }]);
  const [targetGrade, setTargetGrade] = useState(0);
  const [isPending, setIsPending] = useState(false);
  const coursesCollectionRef = collection(db, "courses");
  const [userID, setUserID] = useState('');
  const navigate = useNavigate();

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserID(user.uid)

    } 
  });



  const createCourse = async (e) => {
    e.preventDefault()
    const docRef = new doc(coursesCollectionRef);
    await setDoc(docRef, 
      {courseCode: courseCode, 
      courseName: courseName, 
      targetGrade: targetGrade, 
      gradeList: gradeList, 
      fileNameList: fileNameList,
      id: docRef.id,
      userID: userID
    });
    navigate(-1);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h3>Add a new course</h3>

        <div className="create">
          <form onSubmit = {createCourse}>
            <label>Course Code:</label>
            <input 
              type="course" 
              required
              placeholder="Course Code..."
              value={ courseCode }
              onChange={(e) => setCourseCode(e.target.value)}
            />

            <label>Course Name:</label>
            <input 
              type="course" 
              required
              placeholder="Course Name..."
              value={ courseName }
              onChange={(e) => setCourseName(e.target.value)}
            />

            <button >Add course</button>
            
          </form>
        </div>

      </header>    
    </div>
  );
}

export default Create;