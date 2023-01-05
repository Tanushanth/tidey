import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useState } from 'react';
import { auth } from "./Firebase";


const Navbar = () => {
    const [ isLoggedIn, setIsLoggedIn ] = useState();
    const [ isLoggedOut, setIsLoggedOut ] = useState();
    const navigate = useNavigate();

    const logout = async () => {
        await signOut(auth);
        navigate("./");
        console.log(isLoggedIn);
        setIsLoggedOut(true);
    }

    onAuthStateChanged(auth, (currentUser) => {
        setIsLoggedIn(true);
    })

    return ( 
        <nav class="navbar">
            <div class="navbar__container">
                <Link class="navbar__links" id="navbar__logo" to="./">Tidey</Link>
                
                <div className="navbar__toggle" id="mobile-menu">
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
                
                
                <ul class="navbar__menu">
                    
                    { !isLoggedOut && isLoggedIn && (
                    <article>
                        <ul class="navbar__menu">
                        <li className="navbar__item">
                        <Link className="navbar__links" style={{ marginRight: "50px" }}to="./Login">{localStorage.getItem("email")}</Link>
                        </li>

                        <li className="navbar__item">
                        <Link className="navbar__links" onClick={logout} to="./">Logout</Link>
                        </li>
                        </ul>
                    </article>
                    )}

                    { isLoggedOut && isLoggedIn && (
                        <article>
                        <ul class="navbar__menu">
                            <li className="navbar__item">
                            <Link className="navbar__links" to="./SignUp">Sign Up</Link>
                            </li>
                            
                            
                            <li className="navbar__item">
                            <Link className="navbar__links" to="./Login">Login</Link>
                            </li>
                        </ul>
                        </article>
                    )}
                    
                </ul>

            </div>
        </nav>
     );
}
 
export default Navbar;