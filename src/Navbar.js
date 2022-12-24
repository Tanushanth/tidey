const Navbar = () => {
    return ( 
        <nav class="navbar">
            <div class="navbar__container">
                <a href="" class="navbar__links" id="navbar__logo">Tidey</a>
                
                <div class="navbar__toggle" id="mobile-menu">
                    <span class="bar"></span>
                    <span class="bar"></span>
                    <span class="bar"></span>
                </div>
            
                <ul class="navbar__menu">
                    <li class="navbar__item">
                    <a href="signup" class="navbar__links" id="paintings-page">Sign Up</a>
                    </li>
            
                    <li class="navbar__item">
                    <a href="login" class="navbar__links" id="about-page">Login</a>
                    </li>
            
                    <li class="navbar__item">
                    <a href="about" class="navbar__links" id="contact-page">About Us</a>
                    </li>
                </ul>
            </div>
        </nav>
     );
}
 
export default Navbar;