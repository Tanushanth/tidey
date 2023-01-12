import Tabs from './Tabs';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { db } from './Firebase';
import { storage } from './Firebase';
import { ref, uploadBytes, listAll, getDownloadURL, deleteObject } from "firebase/storage";
import { v4 } from 'uuid';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {doc, getDoc, updateDoc} from 'firebase/firestore';
import {FileMinus} from 'react-feather';

const Workload = () => {
	const [ fileUpload, setFileUpload ] = useState(null);
	const [ showDeleteModal, setShowDeleteModal ] = useState(false);
	const handleClose = () => setShowDeleteModal(false);
	const handleShow = () => setShowDeleteModal(true);

	const { id } = useParams();
	const [ fileList, setFileList ] = useState([]);
	const [ fileNameList, setFileNameList] = useState([]);
	const [ userID, setUserID ] = useState();
	const [ firstUpdate, setFirstUpdate ] = useState(false);
	const [ currentURL, setCurrentURL] = useState("https://firebasestorage.googleapis.com/v0/b/tidey-db.appspot.com/o/DefaultTideyPDF.pdf?alt=media&token=668d2fd8-62dc-42d1-a9e1-a1687b45c213");
	const [ newFileName, setNewFileName ] = useState('');

	
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

		
		/* WHY DOES THI SNOT WORK */
		
		setFileNameList((prev) => [...prev, newFileName])

		uploadBytes(fileRef, fileUpload).then((snapshot) => {
			getDownloadURL(snapshot.ref).then((url) => {
				setFileList((prev) => [...prev, url])
			})
		})


	};


	const updateInformation = async() => {
        const docRef = doc(db, "courses", id);
        await updateDoc( docRef , {fileNameList: fileNameList});
    }

	/* ALL FOR GETTING THE CURRENT COURSE INFO */


    const getCurrentCourse = async () =>{
        const docRef = doc(db, "courses", id);
        const docSnap = await getDoc(docRef);
        setCurrentCourse({...docSnap.data(), id: docSnap.id});
    }

	useEffect(() => {
        getCurrentCourse();
    }, []);


	/* SETTING THE FILE NAME LIST NEW */
    useEffect(() => {        
        if(currentCourse && currentCourse[0] !== ''){
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



	useEffect(() => {
		if(fileNameList.length > 0){
			updateInformation();
		}

		setShowDeleteModal(false);

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

    return ( 
        <div className="App">
            < Tabs />
            <div className="App-header">
				<div className="workload-container">
					
					
					<div className="file-container">

						<div className = "buttonGrid">
							<p style={{ fontWeight: "bold" }}>File List</p>
						{fileList.map((url, index) => (
							<div key = {index}>

									<button 
									type = "button" 
									className = "selectFile-btn"
									onClick = {() => handleFileSelect(url, index)}
								>
									
									{fileNameList[index+1]}
								</button>
								<button 
									type = "button" 
									className = "delFile-btn"
									onClick={ handleShow }
								>
									<FileMinus></FileMinus>
								</button>

								
								<Modal show={ showDeleteModal } onHide={ handleClose } className="modal">
								<Modal.Header  className="modal-header">
									<Modal.Title>Delete Confirmation</Modal.Title>
								</Modal.Header>
								<Modal.Body className="modal-body">Are you sure you want to delete this file?</Modal.Body>
								<Modal.Footer className="modal-footer">
									<button variant="secondary" onClick = {() => handleFileRemove(url, index)} className = "modal-btn">
									Yes
									</button>
									<button variant="primary" onClick={ handleClose } className="modal-btn">
									No
									</button>
								</Modal.Footer>
								</Modal>

							</div>
								
						))}
						
						</div>
						<iframe src={ currentURL }  className="iframe"></iframe>
		
						



					</div>

					<div className="button-container" >
						<form>
						<input type="file" 
							onChange={(e) => { setFileUpload(e.target.files[0]) }} />

						<input 
							type="file-name" 
							placeholder="Enter file title here"
							value={ newFileName }
							onChange={(e) => setNewFileName(e.target.value)}
                        />
						</form>

						<button className="upload-btn" onClick={ uploadFile }>Upload</button>
					</div>
					
				</div>
			
			</div>
        </div>
    );
}
 
export default Workload;