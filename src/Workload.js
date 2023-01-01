import Tabs from './Tabs';
import { useNavigate, useParams } from "react-router-dom";
import useFetch from './UseFetch';
import { useState } from 'react';

const Workload = () => {
    const { id } = useParams();
    const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);
    
	const changeHandler = (e) => {
		setSelectedFile(e.target.files[0]);
		setIsFilePicked(true);
	};

    const handleSubmission = () => {
		const formData = new FormData();

		formData.append('File', selectedFile);

		fetch(
			'http://localhost:8000/courses' + id,
			{
				method: 'POST',
				headers: { "Content-Type": "application/json"},
                body: JSON.stringify(formData),
			}
		)
			.then((response) => response.json())
			.then((result) => {
				console.log('Success:', result);
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	
	};

    return ( 
        <div className="App">
            < Tabs />
            <div className="App-header">
            <div>
			<input type="file" name="file" onChange={changeHandler} />
			{isFilePicked ? (
				<div>
					<p>Filename: {selectedFile.name}</p>
					<p>Filetype: {selectedFile.type}</p>
					<p>Size in bytes: {selectedFile.size}</p>
					<p>
						lastModifiedDate:{' '}
						{selectedFile.lastModifiedDate.toLocaleDateString()}
					</p>
				</div>
			) : (
				<p>Select a file to show details</p>
			)}
			<div>
				<button onClick={handleSubmission}>Submit</button>
			</div>
		</div>
            </div>
        </div>
    );
}
 
export default Workload;