
import { Link } from "react-router-dom";

const Home = () => {
    return ( 
        <header className="App-header">
        <p> <span>Hi, welcome to Tidey.</span> </p>

          <div className="button-container">
            <div className="main-btn">
              <Link className="main-btn-content" to="/Courses">
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
    );
}
 
export default Home;