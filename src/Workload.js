import Tabs from './Tabs';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from './Firebase';
import { storage } from './Firebase';
import { ref, uploadBytes, listAll, getDownloadURL, deleteObject } from "firebase/storage";
import { v4 } from 'uuid';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from 'firebase/firestore';
import { isReactNative } from '@firebase/util';
import { addDoc, doc, getDoc, deleteDoc, updateDoc} from 'firebase/firestore';
import {FileMinus} from 'react-feather';
const Workload = () => {
	const [ fileUpload, setFileUpload ] = useState(null);
	const { id } = useParams();
	const [ fileList, setFileList ] = useState([]);
	const [ fileNameList, setFileNameList] = useState([]);
	const [ userID, setUserID ] = useState();
	const [changesSaved, setChangesSaved] = useState(false);
	const [ firstFile, setFirstFile ] = useState(true);
	const [ firstUpdate, setFirstUpdate ] = useState(false);
	const [ currentURL, setCurrentURL] = useState("https://firebasestorage.googleapis.com/v0/b/tidey-db.appspot.com/o/DefaultTideyPDF.pdf?alt=media&token=668d2fd8-62dc-42d1-a9e1-a1687b45c213");
	const [ newFileName, setNewFileName ] = useState('');
	const [courses, setCourses] = useState();
	const coursesCollectionRef = collection(db, "courses");
    const [currentCourse, setCurrentCourse] = useState();
	const [isFirstFile, setIsFirstFile] = useState(true);

	
	const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserID(user.uid)
      } 
    });

	const fileListRef = ref(storage, `${userID}/${id}`);

	

	const uploadFile = () => {

		if(fileUpload === null) {
			alert("Choose a file");
			return;
		};

		if(!userID) {
			alert("You are not logged in");
		}

		console.log(newFileName);
		const fileRef = ref(storage, `${userID}/${id}/${fileUpload.name + v4()}`);

		
		/* WHY DOES THI SNOT WORK */
		
		setFileNameList((prev) => [...prev, newFileName])





		console.log(fileNameList);

		
		uploadBytes(fileRef, fileUpload).then((snapshot) => {
			getDownloadURL(snapshot.ref).then((url) => {
				setFileList((prev) => [...prev, url])
			})
		})


	};


	const updateInformation = async() => {
        const docRef = doc(db, "courses", id);
        await updateDoc( docRef , {fileNameList: fileNameList});
        setChangesSaved(true);
    }

	/* ALL FOR GETTING THE CURRENT COURSE INFO */
	const getCourses = async () => {
        const data = await getDocs(coursesCollectionRef);
        setCourses(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    };

    const getCurrentCourse = async () =>{
        const docRef = doc(db, "courses", id);
        const docSnap = await getDoc(docRef);
        setCurrentCourse({...docSnap.data(), id: docSnap.id});
    }

	useEffect(() => {
        getCourses();
        getCurrentCourse();
    }, []);


	/* SETTING THE FILE NAME LIST NEW */
    useEffect(() => {        
        if(currentCourse && currentCourse[0] != ''){
            setFileNameList(currentCourse.fileNameList);
        }
    }, [currentCourse]);


	const handleURL = (item) => {
		getDownloadURL(item).then((url) => {
			setFileList((prev) => [...prev, url])	

		});
	}
	useEffect(() => {

		if(userID && !firstUpdate){

			/* JUST TOOK THE URL TO SAVE A STORAGE CALL EVERYTIME
			getDownloadURL(ref(storage, `/DefaultTideyPDF.pdf`)).then((url) => {
				setCurrentURL(url);
				console.log(url);
			});
			*/
			listAll(fileListRef).then((response) => {
				
				response.items.forEach((item) => {
					handleURL(item)		
				});
				setFirstUpdate(true);
				
			});
		
			
		}
	}, [userID, firstUpdate]);



	useEffect(() => {
		if(fileNameList.length > 0){
			updateInformation();
		}

	}, [fileNameList])

	const handleFileRemove = (targetURL, index) => {
		
		const newFileList = [...fileList];
		newFileList.splice(index, 1);
		setFileList(newFileList);

		
		const newFileNameList = [...fileNameList];
		newFileNameList.splice(index+1, 1);
		setFileNameList(newFileNameList);

		listAll(fileListRef).then((response) => {
			response.items.forEach((item) => {
				getDownloadURL(item).then((url) => {
					if(url === targetURL){
						deleteObject(item).then(() => {
							console.log("Deleted!")
							setFileList([]);
							setFirstUpdate(false);
							return;
						})
					}
				});	
			});
		});
		
	}

	const handleFileSelect = (url, index) => {
		setCurrentURL(url);
	}

	/*
	const handleFileName = (e) => {
		//console.log(e.target.value);
		//console.log(newFileName);

		//setNewFileName(e.target.value);
		setFileNameList((prev) => [...prev,  e.target.value]);
		//const newNameList = [...fileNameList];
        //newNameList[element] = e.target.value;
        //setFileNameList(newNameList);
		
	}
	*/

    return ( 
        <div className="App">
            < Tabs />
            <div className="App-header">
				<div className="workload-container">
					
					
					<div className="file-container">

						<div className = "buttonGrid">
							<p>File List</p>
						{fileList.map((url, index) => (
							<div key = {index}>

									<button 
									type = "button" 
									className = "selectFile-btn"
									onClick = {() => handleFileSelect(url, index)}
								>
									
									Select This : {fileNameList[index+1]}
								</button>
								<button 
									type = "button" 
									className = "delFile-btn"
									onClick = {() => handleFileRemove(url, index)}
								>
									<FileMinus></FileMinus>
								</button>
							</div>
								
						))}
						
						</div>
						<iframe src={ currentURL } width="900px" height="1150vh"></iframe>
		
						
					</div>

					<div className="button-container" >
						<form>
						<input type="file" 
							onChange={(e) => { setFileUpload(e.target.files[0]) }} />

						<input 
							type="description" 
							placeholder="Description..."
							value={ newFileName }
							onChange={(e) => setNewFileName(e.target.value)}
                        />
						</form>

						<button style={{ marginTop: "40px" }} onClick={ uploadFile }>Upload</button>
					</div>
					
				</div>
			
			</div>
        </div>
    );
}
 
export default Workload;