/*import { useState, useEffect} from 'react';

export default function Hamburger({ isOpen }){
    const [ width, setWidth ] = useState(window.innerWidth);

    useEffect(() => {
        console.log(window.innerWidth);
    }, [window.innerWidth])

    return(
        <>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>

            <style jsx>{`
                .bar:nth-child(1){
                    transform: ${ isOpen ? 'rotate(45deg) translateY(11px)' : 'rotate(0)'};
                }
                .bar:nth-child(2){
                    transform: ${ isOpen ? 'translateX(100%)' : 'translateX(0)'};
                    opacity: ${ isOpen ? 0 : 1};
                }
                .bar:nth-child(3){
                    transform: ${ isOpen ? 'rotate(-45deg) translateY(-11px)' : 'rotate(0)'};
                }


                .navbar__container {
                    display: flex;
                    justify-content: space-between;
                    height: 80px;
                    z-index: 1;
                    width: 100%;
                    max-width: 1300px;
                    padding: 0;
                  }
                
                  .navbar__menu {
                    display: grid;
                    grid-template-columns: auto;
                    margin: 0;
                    width: 100%;
                    position: absolute;
                    top: -1000px;
                    opacity: 1;
                    transition: all 0.5s ease;
                    z-index: -1;
                  }
                
                  .navbar__menu.active {
                    background: #1a1a1a;
                    top: 100%;
                    opacity: 1;
                    transition: all 0.5s ease;
                    z-index: 99;
                    height: 60vh;
                    font-size: 1.6rem;
                  }
                
                  .navbar__toggle .bar {
                    width: 26px;
                    height: 3px;
                    margin: 5px auto;
                    transition: all 0.3s ease-in-out;
                    background: #fff;
                  }
                
                  #navbar__logo {
                    padding-left: ${isOpen ? '25px' : 0};
                    padding-top:  ${isOpen ? '0' : 0};
                  }
                
                  .navbar__item {
                    width: 100%;
                  }
                
                  .navbar__links {
                    text-align: center;
                    padding: 2rem;
                    width: 100%;
                    display: table;
                    font-size: 1rem;
                  }
               
                
            `}</style>
            
        </>
    )
}
*/