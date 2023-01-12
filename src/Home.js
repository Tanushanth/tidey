import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Home = () => {
  const [ userID, setUserID ] = useState();
  const auth = getAuth();
  const navigate = useNavigate();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserID(user.uid)
    } 
  });

  const handleAlert = () => {
    if(!userID){
      alert("To save your courses, you can log in or sign up!");
    } else{
      navigate("../tidey/Courses");
    }
    
    
    
  }

    return ( 
      <div className="background-style">

          {/* Waves Container*/}
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
          {/*<!--Waves end-->*/}

        <header className="App-header">
            <p className="home-heading">
                Hi, welcome to Tidey.
            </p>

            <div className="main-btn-container">
              <div className="main-btn">
                <div className="main-btn-content" onClick={handleAlert} style={{cursor:'pointer'}}>
                  Course dashboard
                </div>
              </div>
          
              <div className="main-btn">
              <Link className="main-btn-content" to="/tidey/Calculator">
                Calculate grades
              </Link>
              </div>
            </div>
          
        </header>
        </div>

    );
}
 
export default Home;