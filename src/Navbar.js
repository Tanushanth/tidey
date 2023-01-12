import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useState, useEffect} from 'react';
import { auth } from "./Firebase";
import Modal from 'react-bootstrap/Modal';
import HamburgerMenu from './HamburgerMenu';

const Navbar = () => {
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    const [ showModal, setShowModal ] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    const navigate = useNavigate();
    const [ hamburgerOpen, setHamburgerOpen ] = useState(false);

    const toggleHamburger = () => {
        setHamburgerOpen(!hamburgerOpen);
    }
    

    const logout = async () => {
        await signOut(auth);
        localStorage.setItem("email", "undefined");
        setShowModal(false);
        setIsLoggedIn(false);
        navigate("../tidey/");
    }
    
    onAuthStateChanged(auth, (currentUser) => {
        if(localStorage.email !== null && localStorage.getItem("email") !== "undefined"){
            setIsLoggedIn(true);
        }
        else {
            setIsLoggedIn(false);
        }
    })

    useEffect(() => {
        if(!localStorage.email)
            localStorage.setItem("email", "undefined");
    }, [])
    
    return ( 
        <nav class="navbar">
            <div class="navbar__container">
                <Link class="navbar__links" id="navbar__logo" to="./tidey/">Tidey</Link>

                    <div className="navbar__toggle" id="mobile-menu" onClick={ toggleHamburger }>
                        <HamburgerMenu isOpen={ hamburgerOpen } />
                    </div>
                

                    <ul class="navbar__holder">
                        
                        { isLoggedIn  && (
                        <article>
                            <ul class="navbar__menu">
                                <li className="navbar__item">
                                <Link className="navbar__links" style={{ marginRight: "50px" }}to="./tidey/">{localStorage.getItem("email")}</Link>
                                </li>

                                <li className="navbar__item">
                                <Link className="navbar__links" onClick={ ()=>{handleShow();
                                toggleHamburger();} } to="./tidey">Logout</Link>
                                </li>
                            </ul>
                        </article>
                        )}

                        { !isLoggedIn && (
                            <article>
                            <ul class="navbar__menu">
                                <li className="navbar__item">
                                <Link className="navbar__links" to="./tidey/SignUp" onClick={ toggleHamburger } >Sign Up</Link>
                                </li>
                                
                                
                                <li className="navbar__item">
                                <Link className="navbar__links" to="./tidey/Login" onClick={ toggleHamburger } >Login</Link>
                                </li>
                            </ul>
                            </article>
                        )}
                        
                    </ul>
                

                <Modal show={ showModal } className="modal">
                  <Modal.Header className="modal-header">
                    <Modal.Title>Logout Confirmation</Modal.Title>
                  </Modal.Header>
                  <Modal.Body className="modal-body">Are you sure you want to log out?</Modal.Body>
                  <Modal.Footer className="modal-footer">
                    <button variant="secondary" onClick={ logout } className="modal-btn">
                      Yes
                    </button>
                    <button variant="primary" onClick={ handleClose } className="modal-btn">
                      No
                    </button>
                  </Modal.Footer>
                </Modal>
            </div>
        </nav>
     );
}
 
export default Navbar;