import { useState } from 'react';
import { useEffect} from 'react';
import { Link } from "react-router-dom";
import Popup from 'reactjs-popup';

const Calculator = () => {
    

  const [gradeList, setGradeList] = useState([{ desc: "", weight: "", grade: ""}]);
  const [currentGrade, setCurrentGrade] = useState(0);
  const [targetGrade, setTargetGrade] = useState(100);
  const [additionalGrade, setAdditionalGrade] = useState(0);
  const [errorState, setErrorState] = useState(false);



  const handleGradeAdd = () =>{
    setGradeList([...gradeList, {desc: "", weight: "", grade: ""}]);
  }

  const handleGradeRemove = (index) => {
    const newList = [...gradeList];
    newList.splice(index, 1);
    setGradeList(newList);
  }

  const handleInputChange = (e, index, element) => {
    const newList = [...gradeList];
    newList[index][element] = e.target.value;
    setGradeList(newList);

  }

  const handleGradeCalculation = () => {
    let tempGrade = 0;
    let tempWeight = 0;
    for (let i = 0; i < gradeList.length; i++) {
        let thisGrade = parseInt(gradeList[i].grade);
        let thisWeight = parseInt(gradeList[i].weight);
        if(gradeList[i].grade && gradeList[i].weight){
            tempGrade += (thisGrade) * (0.01) * (thisWeight);
            tempWeight += thisWeight;
        }
    }
    setCurrentGrade(100* tempGrade/tempWeight );
    let remainingWeight = 100 - tempWeight;
    let remainingGrade = targetGrade - (tempGrade);
    setAdditionalGrade(100* remainingGrade/remainingWeight)
    
  }

  const handleTargetChange = (e) => {
    setTargetGrade(e.target.value);
  }

  const handleErrorCheck = () => {
    let zeroWeightError = true;
    let noInfoError = true;
    let oneNumberError = false;
    for (let i = 0; i < gradeList.length; i++) {

        if(gradeList[i].weight !== 0){
            zeroWeightError = false;
            noInfoError = false;
        }
        if(gradeList[i].grade !== 0){
            noInfoError = false;
        }
        if((!gradeList[i].grade && gradeList[i].weight) ||
        (gradeList[i].grade && !gradeList[i].weight)){
            oneNumberError = true;
        }



        if(zeroWeightError || noInfoError || oneNumberError){
            setErrorState(true);
        }
        else{
            setErrorState(false);
        }

    }
  }

  useEffect(() => {
    console.log("USEEFFECT")
    document.documentElement.style.setProperty('--table-width', (gradeList.length) * 300)
  }, [gradeList, targetGrade])
  
  return (
    
    <div className="App">
        <header className="App-header">
            <div className="calc-container">
              <div className="table">
                    <p>Grade Calculator</p>

                    <div className="text-table">
                        
                        <form>
                            <label>Enter your grades below:</label>

                            {gradeList.map((singleRow, index) => (
                                
                                <div className="inputFields">
                                    <div key = {index} className = "gradeRow">
                                        <input 
                                            type="description" 
                                            placeholder="Description"
                                            value = {singleRow.desc} 
                                            onChange = {(e) => handleInputChange(e, index, "desc")}
                                        />
                                        <input 
                                            type= "number" 
                                            placeholder="Weight (%)"
                                            value = {singleRow.weight} 
                                            onChange = {(e) => handleInputChange(e, index, "weight")}
                                        />
                                        <input 
                                            type= "number" 
                                            placeholder="Grade"
                                            value = {singleRow.grade} 
                                            onChange = {(e) => handleInputChange(e, index, "grade")}
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
            <div className = "target-container">
                <p>Enter Target Grade (%):
                    <input 
                        type= "number" 
                        placeholder="Target Grade"
                        value = {targetGrade} 
                        onChange = {(e) => handleTargetChange(e)}
                    />
                </p>
            </div>

            <div className = "result-container">

                <button 
                    type = "button" 
                    className = "calcGrade-btn"
                    onClick = {() => {
                        handleErrorCheck()

                        if(errorState === false){
                            handleGradeCalculation()
                        }
                        else{
                            alert("Please enter valid Grades/Weights");
                        }

                        
                    }}
                >
                    <p>Calculate Grade!</p>
                </button>
                <p>Calculated Grade: {currentGrade.toFixed(2)}%</p>

            </div>
            <div className = "gradeNeeded-container">
                <p>Additional Grade Needed: {additionalGrade.toFixed(2)}%</p>

            </div>
        </header>
    </div>
  );
}

export default Calculator;