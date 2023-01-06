import Tabs from './Tabs';
import { useState, useEffect } from 'react';
import { storage } from './Firebase';
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from 'uuid';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Workload = () => {
	const [ fileUpload, setFileUpload ] = useState(null);
	const [ fileList, setFileList ] = useState([]);
	const [userID, setUserID] = useState('');
	const [ isUploaded, setIsUploaded ] = useState(false);

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserID(user.uid)
      } 
    });

	const fileListRef = ref(storage, `${userID}/`);
	const uploadFile = () => {
		if(fileUpload === null) {
			alert("Choose a file");
			return;
		};

		if(!userID) {
			alert("You are not logged in");
		}

		const fileRef = ref(storage, `${userID}/${fileUpload.name + v4()}`);
		uploadBytes(fileRef, fileUpload).then((snapshot) => {
			getDownloadURL(snapshot.ref).then((url) => {
				setFileList((prev) => [...prev, url])
				setIsUploaded(true);
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
	}, [isUploaded]);

    return ( 
        <div className="App">
            < Tabs />
            <div className="App-header">
				<div className="workload-container">
	
					{ fileList.map((url) => {
					return <iframe src={url} width="80%" height="700px"></iframe>
					})}
					
					<input type="file" 
						onChange={(e) => {setFileUpload(e.target.files[0])}} />
					<button style={{ marginTop: "40px", marginBottom: "40px"}} onClick={uploadFile}>Upload</button>

					
				</div>
			
			</div>
        </div>
    );
}
 
export default Workload;