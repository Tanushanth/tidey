const SignUp = () => {
  return (
    <div className="App">
      <header className="App-header">
          <div className="textbox">
            <p className="textbox-heading" style={{ fontWeight: "bold" }}>Create a new Tidey account</p>
            <p className="textbox-subheading">Username: </p>
            <input type="text" className="form"></input>
            <p className="textbox-subheading">Password: </p>
            <input type="text" className="form"></input>

            <button>Create</button>
          </div>
      </header>
    </div>
  );
}

export default SignUp;