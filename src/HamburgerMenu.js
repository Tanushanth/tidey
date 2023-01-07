import { useState, useEffect} from 'react';

export default function Hamburger({ isOpen }){
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

                .navbar {
                  background: #1A1A1A;
                  height: 8vh;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  font-size: 1.1rem;
                  font-weight: bold;
                  position: sticky;
                  top: 0;
                  z-index: 999;
                  color:white;
                }
                
                .navbar__container {
                  display: flex;
                  justify-content: space-between;
                  height: 80px;
                  z-index: 1;
                  width: 100%;
                  max-width: 1300px;
                  margin: 0 auto;
                  padding: 0 0px;
                }
                
                #navbar__logo {
                  background: #ffffff;
                  background-size: 100%;
                  font-weight: medium;
                  -webkit-background-clip: text;
                  -moz-background-clip: text;
                  -webkit-text-fill-color: transparent;
                  -moz-text-fill-color: transparent;
                  display: flex;
                  align-items: center;
                  cursor: pointer;
                  text-decoration: none;
                  font-size: 1.95rem;
                  font-family: 'Great Vibes', cursive;
                }
                
                .navbar__menu {
                  display: flex; 
                  align-items: center;
                  list-style: none;
                }

                .navbar__holder {
                  display: flex; 
                  align-items: center;
                  list-style: none;
                }
                
                .navbar__item {
                  height: 80px;
                }
                
                .navbar__links {
                  color: #ffffff;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  width: 155px;
                  font-size: 1.1rem;
                  text-decoration: none;
                  height: 100%;
                  transition: all 0.3s ease;
                }
                
                .navbar__links:hover {
                  color: #00B4DB;
                  transition: all 0.3s ease;
                }
                
                .bar {
                  width: 25px;
                  height: 3px;
                  margin: 5px auto;
                  transition: all 0.3s ease-in-out;
                  background: #fff;
                }
                
                
                @media screen and (max-width: 800px) {
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
                    display: ${ isOpen ? 'grid': 'none'};
                    grid-template-columns: ${ isOpen ? 'none': 'auto'};
                    margin: ${ isOpen ? '-50px': '0'};
                    width: ${ isOpen ? 'auto 100%': '100%'};
                    position: ${ isOpen ? 'absolute': 'absolute'};
                    top: ${ isOpen ? '100%': '-1000px'};
                    transition: all 0.5s ease;
                    z-index: ${ isOpen ? '99': '-1'};
                    background: ${ isOpen ? '#1a1a1a': 'none'};
                    opacity: ${ isOpen ? '90%': '1'};
                    height: ${isOpen ? '30vh' : '0'};
                    font-size: ${isOpen ? '1.6rem' : ''};
                    border-style: solid;
                    border-color: 'white';
                  }
                
                  .bar {
                    width: 26px;
                    height: 3px;
                    margin: 5px auto;
                    transition: all 0.3s ease-in-out;
                    background: #fff;
                  }
                
                  #navbar__logo {
                    text-align: center;
                    padding-left:  ${isOpen ? '25px' : '0px'};
                    padding-top: 0px;
                  }
                
                  .navbar__item {
                    width: ${isOpen ? '100%' : ''};
                  }
                
                  .navbar__links {
                    text-align: ${isOpen ? 'center' : 'left'};
                    padding: ${isOpen ? '2rem' : 0};
                    width: ${isOpen ? '100%' : ''};
                    display: ${isOpen ? 'table' : 'flex'};
                    font-size: ${isOpen ? '1rem' : ''};
                    transition: all 0.5s ease;
                  }
                
                
                  .navbar__toggle {
                    position: absolute;
                    top: 20%;
                    right: 5%;
                    transform: translate(5%, 20%);
                  }
                
                  .bar {
                    display: block;
                    cursor: pointer;
                  }
                }
               
                
            `}</style>
            
        </>
    )
}