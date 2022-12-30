import { Link } from "react-router-dom";
 
const Navbar = () => {
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
                    <li className="navbar__item">
                    <Link className="navbar__links" to="./SignUp">Sign Up</Link>
                    </li>
            
                    <li className="navbar__item">
                    <Link className="navbar__links" to="./Login">Login</Link>
                    </li>
            
                    <li className="navbar__item">
                    <Link className="navbar__links" to="./AboutUs">About Us</Link>
                    </li>
                </ul>
            </div>
        </nav>
     );
}
 
export default Navbar;