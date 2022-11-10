import './App.css';

function signin() {
  return (
    <div className="App">
      <header className="App-header">
        <p><span>Hi, </span>what would you like to do today?
        </p>
          
        <div className="button-container">
            <div className="main-btn">
            <a
            className="main-btn-content"
            href="SignLog.js">
            Sign Up
            </a>
            </div>
        </div>
      </header>
    </div>
  );
}

export default signin;