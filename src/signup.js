import { useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from "./Firebase";

const headingStyle = {
  textAlign: "center",
  fontFamily: "'Quicksand'",
  fontSize: "calc(5px + 2vmin)",
  marginBottom: "30px",
  paddingTop: "30px"
}

const SignUp = () => {
  const [ registerEmail, setRegisterEmail ] = useState("");
  const [ registerPassword, setRegisterPassword ] = useState("");
  const navigate = useNavigate();
  const [ user, setUser ] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
    localStorage.setItem("email", user.email);
  })

  const register = async (e) => {
    e.preventDefault()

    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      alert('You are logged in');
      navigate(-1);
    } catch(error) {
        console.log(error.message);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
          <div className="textbox">
            <p className="textbox-heading" style={{ fontWeight: "bold" }}>Create a new Tidey account</p>

            <form onSubmit={register}>
              <label style={headingStyle}>Enter an Email:</label>
              <input type="text" 
                placeholder="Email..." 
                onChange={(e)=> {setRegisterEmail(e.target.value)}}
                className="form" />
              
              <label style={headingStyle} >Enter a Password:</label>
              <input type="text" 
                placeholder="Password..." 
                onChange={(e)=> {setRegisterPassword(e.target.value)}}
                className="form" />

              <button>Create</button>
            </form>
          </div>
      </header>
    </div>
  );
}

export default SignUp;