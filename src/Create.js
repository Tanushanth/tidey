import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const [courseCode, setCourseCode] = useState('');
  const [courseName, setCourseName] = useState('');
  const [gradeList, setGradeList] = useState([{ desc: "", weight: "", grade: ""}]);
  const [targetGrade, setTargetGrade] = useState(0);
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const courses = { courseCode, courseName, gradeList, targetGrade};

    setIsPending(true);

    fetch('http://localhost:8000/courses', {
      method: 'POST',
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(courses)
    }).then(() => {
      console.log('new course added');
      setIsPending(false);
      navigate(-1);
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <h3>Add a new course</h3>

        <div className="create">
          <form onSubmit={ handleSubmit }>
            <label>Course Code:</label>
            <input 
              type="text" 
              required
              value={ courseCode }
              onChange={(e) => setCourseCode(e.target.value)}
            />

            <label>Course Name:</label>
            <input 
              type="text" 
              required
              value={ courseName }
              onChange={(e) => setCourseName(e.target.value)}
            />

            { !isPending && <button>Add course</button> }
            { isPending && <button disabled>Adding course...</button> }
          </form>
        </div>

      </header>    
    </div>
  );
}

export default Create;