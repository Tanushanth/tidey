import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useState } from 'react';
import { auth } from "./Firebase";
import Modal from 'react-bootstrap/Modal';


const modalStyle = {
    position: "fixed",
    fontFamily: "'Quicksand', sans-serif",
    zIndex: "-100px",
    top: "10%",
    left: "50%",
    width: "500px",
    marginLeft: "-260px",
    backgroundColor: 'white',
    border: "1px solid #999",
    borderRadius: "6px",
    boxShadow: "0 3px 7px rgba(0,0,0,0.3))",
    outline: "none",
    fontWeight: "bold"
}

const modalHeaderStyle = {
    padding: "9px 15px",
    borderBottom: "1px solid #eee",
}

const modalBodyStyle = {
    position: "relative",
    overflowY: "auto",
    maxHeight: "400px",
    padding: "15px"
}

const modalFooterStyle = {
    padding: "14px 15px 15px",
    marginBottom: "0",
    textAlign: "right",
    backgroundColor: "#f5f5f5",
    borderTop: "1px solid #ddd",
    borderRadius: "0 0 6px 6px",
    boxShadow: "inset 0 1px 0 @white",
}

const modalBtn = {
    background: "#2596be",
    fontWeight: "bold",
    color: "#fff",
    border: "0",
    padding: "8px",
    borderRadius: "8px",
    cursor: "pointer",
    marginRight: "20px"
}

const Navbar = () => {
    const [ isLoggedIn, setIsLoggedIn ] = useState();
    const [ isLoggedOut, setIsLoggedOut ] = useState();
    const [ showModal, setShowModal ] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    const navigate = useNavigate();

    const logout = async () => {
        await signOut(auth);
        navigate("./");
        setShowModal(false);
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
                        <Link className="navbar__links" style={{ marginRight: "50px" }}to="./">{localStorage.getItem("email")}</Link>
                        </li>

                        <li className="navbar__item">
                        <Link className="navbar__links" onClick={ handleShow } to="./">Logout</Link>
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

                <Modal show={ showModal } style={ modalStyle }>
                  <Modal.Header  style={ modalHeaderStyle }>
                    <Modal.Title>Logout Confirmation</Modal.Title>
                  </Modal.Header>
                  <Modal.Body style={ modalBodyStyle }>Are you sure you want to log out?</Modal.Body>
                  <Modal.Footer style={ modalFooterStyle }>
                    <button variant="secondary" onClick={ logout } style={ modalBtn }>
                      Yes
                    </button>
                    <button variant="primary" onClick={ handleClose } style={ modalBtn }>
                      No
                    </button>
                  </Modal.Footer>
                </Modal>
            </div>
        </nav>
     );
}
 
export default Navbar;