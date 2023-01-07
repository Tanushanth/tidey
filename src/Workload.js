import Tabs from './Tabs';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from './Firebase';
import { storage } from './Firebase';
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from 'uuid';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from 'firebase/firestore';


const Workload = () => {
	const [ fileUpload, setFileUpload ] = useState(null);
	const { id } = useParams();
	const [ fileList, setFileList ] = useState([]);
	const [ userID, setUserID ] = useState('');
	const coursesCollectionRef = collection(db, "courses");

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
			})
		})
	};

	useEffect(() => {
		listAll(fileListRef).then((response) => {
			response.items.forEach((item) => {
				getDownloadURL(item).then((url) => {
					setFileList((prev) => [...prev, url]);
				})
			})
		});
	}, [fileListRef]);


    return ( 
        <div className="App">
            < Tabs />
            <div className="App-header">
				<div className="workload-container">
					<div className="file-container">
						{ fileList.map((url) => {
							return <iframe src={ url } width="90%" height="90%"></iframe>
						})}
					</div>

					<div className="button-container">
						<input type="file" 
							onChange={(e) => { setFileUpload(e.target.files[0]) }} />
						<button style={{ marginTop: "40px" }} onClick={ uploadFile }>Upload</button>
					</div>

					
				</div>
			
			</div>
        </div>
    );
}
 
export default Workload;