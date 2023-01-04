import { signInWithGoogle } from './Firebase';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  return (
    <div className="App">
      <header className="App-header">
          <div className="textbox">
            <p className="textbox-heading" style={{ fontWeight: "bold" }}>Log in to your account</p>
            <button onClick={signInWithGoogle}>Sign in with Google</button>
            <p className="textbox-subheading">Username: </p>
            <input type="text" className="form"></input>
            <p className="textbox-subheading">Password: </p>
            <input type="text" className="form"></input>
            

            <button>Enter</button>
          </div>
      </header>
    </div>
  );
}

export default Login;