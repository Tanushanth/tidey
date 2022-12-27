import './App.css';
import Navbar from './Navbar';
import { useState } from 'react';
import { Link } from "react-router-dom";
import anime from "animejs/lib/anime.es.js"



const Calculator = () => {

  const [gradeList, setGradeList] = useState([{ desc: "", weight: "", grade: ""}]);

  console.log(gradeList);
  const handleGradeAdd = () =>{
    setGradeList([...gradeList, {desc: "", weight: "", grade: ""}]);
  }

  const handleGradeRemove = (index) => {
    const newList = [...gradeList];
    newList.splice(index, 1);
    setGradeList(newList);
  }

  const handleInputChange = (e, index) => {
    const {name, value} = e.target;
    const newList = [...gradeList];
    newList[index].name = e.target.value;
    setGradeList(newList);

  }
  return (
    
    <div className="App">
    <Navbar />


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
                                        <input 
                                            type="description" 
                                            placeholder="Description"
                                            value = {singleRow.weight} 
                                            onChange = {(e) => handleInputChange(e, index)}
                                        />
                                        <input type="weighting" placeholder="Weight (%)"/>
                                        <input 
                                        type="grade" 
                                        placeholder="Grade" 
                                        value = {singleRow.grade} 
                                        onChange = {(e) => handleInputChange(e, index)}
                                        />

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

            <div className = "result-container">
                
            </div>
        </header>
    </div>
  );
}

export default Calculator;