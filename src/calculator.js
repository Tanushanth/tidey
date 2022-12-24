import './App.css';
import { useState } from 'react';
import { Link } from "react-router-dom";
import anime from "animejs/lib/anime.es.js"



const Calculator = () => {

  const [gradeList, setGradeList] = useState([{ desc: "", weight: "", grade: ""}]);


  const handleGradeAdd = () =>{
    setGradeList([...gradeList, {grade: ""}]);
  }

  const handleGradeRemove = (index) => {
    const newList = [...gradeList];
    newList.splice(index, 1);
    setGradeList(newList);
  }
  return (
    
    <div className="App">
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


        <header className="App-header">
            <div className="calc-container">
                <div className="table">
                    <p>Grade Calculator</p>

                    <div className="text-table">
                        
                        <form>
                            <label>Enter your grades below:</label>

                            /* Basically returns as many input fields and the index is */
                            {gradeList.map((singleRow, index) => (
                                
                                <div className="inputFields">
                                    <div key = {index} className = "gradeRow">
                                        <input type="description" placeholder="Description"/>
                                        <input type="weighting" placeholder="Weight (%)"/>
                                        <input type="grade" placeholder="Grade"/>

                                        {gradeList.length - 1 === index && (
                                            <button 
                                                type = "button" 
                                                className = "addGrade-btn"
                                                onClick = {handleGradeAdd}
                                            >
                                                <p>Add Row</p>
                                            </button>
                                        )}

                                        {gradeList.length > 1 && (
                                            <button 
                                                type = "button" 
                                                className = "delGrade-btn"
                                                onClick = {() => handleGradeRemove(index)}
                                            >
                                                <p>Remove Row</p>
                                            </button>
                                        )}
                                        
                                    </div>
                                </div>
                            
                            
                            
                            ))}





                        </form>
                    </div>
                </div>
            </div>
        </header>
    </div>
  );
}

export default Calculator;