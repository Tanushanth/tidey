import { useState } from 'react';

const Create = () => {
  const [courseCode, setCourseCode] = useState('');
  const [courseName, setCourseName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const courses = { courseCode, courseName };

    fetch('http://localhost:8000/courses', {
      method: 'POST',
      headers: { "Content-Type": "applications/json"},
      body: JSON.stringify(courses)
    }).then(() => {
      console.log('new course added');
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

            <button>Add course</button>

          </form>
        </div>

      </header>    
    </div>
  );
}

export default Create;