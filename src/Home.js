
import { Link } from "react-router-dom";
import image from "./Wavey.png"
const Home = () => {
    return ( 
      <div style = {{backgroundImage: `url(${image})`, backgroundSize: '100%'}}>
        <header className="App-header">
          
            <p 
              style={{ fontFamily: "'Great Vibes', cursive", fontSize: "calc(100px + 2vmin)", textShadow: "2px 2px 3px #101010" }}>
                Hi, welcome to Tidey.
            </p>

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
        </div>

    );
}
 
export default Home;