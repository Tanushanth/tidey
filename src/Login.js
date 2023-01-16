import { auth } from './Firebase';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useState, useEffect } from 'react';

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
  const [ windowHeight, setWindowHeight ] = useState(window.innerHeight); 


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
      
      alert('You are logged in');
      navigate("../tidey/");
    } catch(FirebaseError) {
        console.log(FirebaseError.message);
        alert("Password or email is incorrect")
    }
  }


  const provider = new GoogleAuthProvider();


  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
    .then((result) => {
      const name = result.user.displayName;
      localStorage.setItem("name", name);
      alert('You are logged in');
      if((localStorage.getItem("email") !== "undefined")){
        navigate("../tidey/");
      }
    })
    .catch((error) => {
      console.log(error);
    })
  };


  useEffect(() => {
    const handleWindowResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });


  return (
    <div className="App">
       <div className="background-style">

      {/* Waves Container*/}
      {windowHeight >= 750 && 
        (
          <div>
            <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto" >
              <defs>
                <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
              </defs>
              <g class="parallax">
                <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(120,180,231,0.3)" />
                <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(120,180,231,0.5)" />
                <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(120,180,231,0.7)" />
                <use xlinkHref="#gentle-wave" x="48" y="7" fill="rgba(120,180,255,1.000)" />
              </g>
            </svg>
          </div>
        )} 
      {/* Waves End */}

      <header className="App-header">
          <div className="textbox">
            <p className="textbox-heading" style={{ fontWeight: "bold" }}>Log in to your account</p>
            <button onClick={ signInWithGoogle }>Sign in with Google</button>

            <form onSubmit={ login }>
              <label style={ headingStyle } >Email: </label>
              <input type="info" 
                placeholder="Email..."
                onChange={(e)=> { setLoginEmail(e.target.value) }}
                className="form"/>

              <label style={headingStyle} >Password: </label>
              <input type="info" 
                placeholder="Password..."
                onChange={(e)=> { setLoginPassword(e.target.value) }}
                className="form"/>
              <button>Enter</button>
            </form>
          </div>
      </header>
    </div>
    </div>
  );
}

export default Login;