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
      
          <Link to="/login">Login</Link>
        </li>
        <li>
  
          <Link to="/signup">Signup</Link>
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