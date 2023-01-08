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


const Workload = () => {
	const [ fileUpload, setFileUpload ] = useState(null);
	const { id } = useParams();
	const [ fileList, setFileList ] = useState([]);
	const [ fileNameList, setFileNameList] = useState([]);
	const [ userID, setUserID ] = useState();
	const [ firstUpdate, setFirstUpdate ] = useState(false);
	const [ currentURL, setCurrentURL] = useState();
	const [ newFileName, setNewFileName ] = useState('');
	const [courses, setCourses] = useState();
	const coursesCollectionRef = collection(db, "courses");
    const [currentCourse, setCurrentCourse] = useState();

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

		const fileRef = ref(storage, `${userID}/${id}/${fileUpload.name + v4()}`);

		uploadBytes(fileRef, fileUpload).then((snapshot) => {
			getDownloadURL(snapshot.ref).then((url) => {
				setFileList((prev) => [...prev, url])
				setFileNameList((prev) => [...prev, newFileName]);
			})
		})
	};



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
        if(currentCourse){
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

			
			listAll(fileListRef).then((response) => {
				
				response.items.forEach((item) => {
					handleURL(item)		
				});
				setFirstUpdate(true);
				
			});
		
			
		}
	}, [userID, firstUpdate]);

	const handleFileRemove = (targetURL, index) => {
		const newFileList = [...fileList];
		
		fileList.splice(index, 1);
		setFileList(newFileList);


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

	const handleFileName = (e) => {
		setFileNameList((prev) => [...prev,  newFileName]);
	}

    return ( 
        <div className="App">
            < Tabs />
            <div className="App-header">
				<div className="workload-container">
					
					
					<div className="file-container">

					
					{fileList.map((url, index) => (
						<div key = {index}>

								<button 
								type = "button" 
								className = "selectFile-btn"
								onClick = {() => handleFileSelect(url, index)}
							>
								Select This : {fileNameList[index]}
							</button>
							<button 
								type = "button" 
								className = "delFile-btn"
								onClick = {() => handleFileRemove(url, index)}
							>
								remove :D
							</button>
						</div>
                            
                    ))}
					
					<iframe src={ currentURL } width="900px" height="300vh"></iframe>
		
						
					</div>

					<div className="button-container" >
						<input type="file" 
							onChange={(e) => { setFileUpload(e.target.files[0]) }} />

						<input 
							type="description" 
							placeholder="Description"
							value = { newFileName } 
							onChange = {(e) => handleFileName(e)}
                        />

						<button style={{ marginTop: "40px" }} onClick={ uploadFile }>Upload</button>
					</div>
					
				</div>
			
			</div>
        </div>
    );
}
 
export default Workload;