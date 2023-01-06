import { Link } from "react-router-dom";

const Home = () => {
  { /*const handleAlert = () => {
    alert("To save your courses, you can log in or sign up!")
  }
*/ }

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

            <div className="button-container">
              <div className="main-btn">
                <Link className="main-btn-content" /*onClick={handleAlert} */ to="/Courses">
                  Course dashboard
                </Link>
              </div>
          
              <div className="main-btn">
              <Link className="main-btn-content" to="/Calculator">
                Calculate grades
              </Link>
              </div>
            </div>
          
        </header>
        </div>

    );
}
 
export default Home;