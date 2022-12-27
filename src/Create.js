const Create = () => {

  return (
    <div className="App">
      <header className="App-header">
        <h3>Add a new blog</h3>

        <div className="create">
          <form>
            <label>Course Code:</label>
            <input type="text" required/>
            <label>Course Name:</label>
            <input type="text" required/>
            <button>Add course</button>
          </form>
        </div>

      </header>    
    </div>
  );
}

export default Create;