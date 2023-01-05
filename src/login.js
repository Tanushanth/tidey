import { auth } from './Firebase';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useState } from 'react';
import { RefreshCcw } from 'react-feather';

const headingStyle = {
  textAlign: "center",
  fontFamily: "'Quicksand'",
  fontSize: "calc(5px + 2vmin)",
  marginBottom: "30px",
  paddingTop: "30px"
}

const Login = () => {
  const navigate = useNavigate();
  const [ loginEmail, setLoginEmail ] = useState("");
  const [ loginPassword, setLoginPassword ] = useState("");
  const [ user, setUser ] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
    localStorage.setItem("email", user?.email);
  })

  const login = async (e) => {
    e.preventDefault()

    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      navigate(-1);
      alert('You are logged in');
      
    } catch(error) {
        console.log(error.message);
    }
  }

  const provider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
    .then((result) => {
      const name = result.user.displayName;
      localStorage.setItem("name", name);
      navigate(-1);
      alert('You are logged in');
    })
    .catch((error) => {
      console.log(error);
    })
  };

  return (
    <div className="App">
      <header className="App-header">
          <div className="textbox">
            <p className="textbox-heading" style={{ fontWeight: "bold" }}>Log in to your account</p>
            <button onClick={signInWithGoogle}>Sign in with Google</button>

            <form onSubmit={login}>
              <label style={headingStyle} >Email: </label>
              <input type="text" 
                placeholder="Email..."
                onChange={(e)=> {setLoginEmail(e.target.value)}}
                className="form"/>

              <label style={headingStyle} >Password: </label>
              <input type="text" 
                placeholder="Password..."
                onChange={(e)=> {setLoginPassword(e.target.value)}}
                className="form"/>
              <button>Enter</button>
            </form>
          </div>
      </header>
    </div>
  );
}

export default Login;