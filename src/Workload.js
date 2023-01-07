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
	const [ isUploaded, setIsUploaded ] = useState(false);

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
				setIsUploaded(true);
				setFileList((prev) => [...prev, url])
			})
		})
	};

	useEffect(() => {
		listAll(fileListRef).then((response) => {
		  response.items.forEach((item) => {
			getDownloadURL(item).then((url) => {
			  setFileList((prev) => [...prev, url]);
			});
		  });
		});
	}, []);


    return ( 
        <div className="App">
            < Tabs />
            <div className="App-header">
				<div className="workload-container">
					{ isUploaded &&
						<article>
						<div className="file-container">
							{ fileList.map((url) => {
								return <iframe src={ url } width="900px" height="300vh"></iframe>
							})}
						</div>

						<div className="button-container">
							<input type="file" 
								onChange={(e) => { setFileUpload(e.target.files[0]) }} />
							<button style={{ marginTop: "40px" }} onClick={ uploadFile }>Upload</button>
						</div>
						</article>
					}

					{ !isUploaded &&
						<article>
						<div className="button-container">
							<input type="file" 
								onChange={(e) => { setFileUpload(e.target.files[0]) }} />
							<button style={{ marginTop: "40px" }} onClick={ uploadFile }>Upload</button>
						</div>
						</article>
					}
				</div>
			
			</div>
        </div>
    );
}
 
export default Workload;