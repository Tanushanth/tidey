import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PlusCircle } from 'react-feather';
import Tabs from './Tabs';
import { db} from "./Firebase";
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';



const CourseCalculator = () => {

    const {id} = useParams();
    const [gradeList, setGradeList] = useState([{ desc: "", weight: "", grade: ""}]);
    const [currentGrade, setCurrentGrade] = useState(0);
    const [targetGrade, setTargetGrade] = useState(100);
    const [additionalGrade, setAdditionalGrade] = useState(0);
    const [errorState, setErrorState] = useState(false);
    const [currentCourse, setCurrentCourse] = useState();
    const [changesSaved, setChangesSaved] = useState(false);

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
        updateInformation();
    }

    const handleTargetChange = (e) => {
        setTargetGrade(e.target.value);
        /*handleDatabaseUpdate();*/
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

    const getCurrentCourse = async () =>{
        const docRef = doc(db, "courses", id);
        const docSnap = await getDoc(docRef);
        setCurrentCourse({...docSnap.data(), id: docSnap.id});
        
    }
    
    const updateInformation = async() => {
        const docRef = doc(db, "courses", id);
        await updateDoc( docRef , {gradeList: gradeList, targetGrade: targetGrade});
        setChangesSaved(true);
    }

    useEffect(() => {
        getCurrentCourse();
    }, []);

    useEffect(() => {        
        if(currentCourse){
            setGradeList(currentCourse.gradeList);
        }
    }, [currentCourse]);

    useEffect(() => {
        document.documentElement.style.setProperty('--table-width', (gradeList.length) * 300)
    }, [gradeList, targetGrade]);
  
    useEffect(() =>{
        const handler = (e: BeforeUnloadEvent) => {
            e.preventDefault();
            e.returnValue = '';
        }

        if(changesSaved === false){
            window.addEventListener('beforeunload', handler);
            return () =>{
                window.removeEventListener('beforeunload', handler);
            }
        }

        return () => {}
    }, []);

    
    return (
        <div className="App">
            <Tabs />
            <header className="App-header">
            <div className = "calc-card-container-1">
                <div className = "calc-card">
                    <h1>Current Grade</h1>
                    <h2>{currentGrade.toFixed(2)}%</h2>
                </div>
                <div className = "calc-card">
                    <h1>Additional Grade Needed</h1>
                    <h2>{additionalGrade.toFixed(2)}%</h2>
                </div>
            </div>

                <div className="calc-container">
                <div className="table" style={{ fontSize: "calc(16px + 2vmin)", fontWeight: "bold" }}>
                        <p>Grade Calculator</p>
                        <div className="text-table">
                            
                            <form>
                                <label className="grades-heading">Enter your grades below:</label>
                                
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
                                    
                                            
                                            {gradeList.length > 1 && (
                                                <button 
                                                    type = "button" 
                                                    className = "delGrade-btn"
                                                    onClick = {() => handleGradeRemove(index)}
                                                >
                                                    Remove
                                                </button>
                                            )}
                                            


                                        </div>
                                        {gradeList.length - 1 === index && (
                                                <button 
                                                    type = "button" 
                                                    className = "addGrade-btn"
                                                    
                                                    onClick = {handleGradeAdd}
                                                > 
                                                <div classname = "addGrade-btn-child">
                                                <PlusCircle color = '#4ccbf9' classname = "addGrade-btn-child"> </PlusCircle>
                                                    
                                                </div>
                                                <p style={{marginLeft: "10px"}}>Add Row</p>
                                                </button>
                                            )}  
                                    </div>
                                ))}
                            </form>
                        </div>
                    </div>
                </div>

                <div className = "target-container">
                    <p className="target-header">Enter Target Grade (%):
                        <input 
                            type= "target" 
                            placeholder="Target Grade"
                            value = {targetGrade} 
                            onChange = {(e) => handleTargetChange(e)}
                        />
                    </p>

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
                    >Calculate/Save Grade!
                    </button>
                </div>
            </header>
        </div>
    );
    }

export default CourseCalculator;