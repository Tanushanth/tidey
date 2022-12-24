const Navbar = () => {
    return ( 
        <nav class="navbar">
            <div class="navbar__container">
                <a href="App" class="navbar__links" id="navbar__logo">Tidey</a>
                
                <div class="navbar__toggle" id="mobile-menu">
                    <span class="bar"></span>
                    <span class="bar"></span>
                    <span class="bar"></span>
                </div>
            
                <ul class="navbar__menu">
                    <li class="navbar__item">
                    <a href="Signup" class="navbar__links" id="paintings-page">Sign Up</a>
                    </li>
            
                    <li class="navbar__item">
                    <a href="Login" class="navbar__links" id="about-page">Login</a>
                    </li>
            
                    <li class="navbar__item">
                    <a href="About" class="navbar__links" id="contact-page">About Us</a>
                    </li>
                </ul>
            </div>
        </nav>
     );
}
 
export default Navbar;