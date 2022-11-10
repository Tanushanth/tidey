import './App.css';
import { Link } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
          <p><span>Hi, </span>what would you like to do today?
          </p>
          <div className="button-container">

        <div className="main-btn">
        <ul>
        <li>
          {/* Endpoint to route to Home component */}
          <Link to="/">Home</Link>
        </li>
        <li>
          {/* Endpoint to route to About component */}
          <Link to="/about">About</Link>
        </li>
        <li>
          {/* Endpoint to route to Contact Us component */}
          <Link to="/contactus">Contact Us</Link>
        </li>
      </ul>
        </div>

        
        <div className="main-btn">
        <a
          className="main-btn-content"
          href="Login.js"
        
        >
          Log In
        </a>
        </div>
        </div>
      </header>
    </div>
  );
}

export default App;