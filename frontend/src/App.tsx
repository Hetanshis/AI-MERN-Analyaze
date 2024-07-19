
import { useState } from 'react';
import './App.css'
import axios from 'axios';

function App() {
 
  const [selectedFile, setSelectedFile] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFileChange = (event:any) => {
      setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
      const formData = new FormData();
      formData.append('image', selectedFile);

      try {
        
          const response = await axios.post('http://localhost:3000/upload/image', formData, {
              headers: {
                  'Content-Type': 'multipart/form-data',
              },
          });
          console.log(response.data.data)
          setFirstName(response.data.data.firstName);
          setLastName(response.data.data.lastName);
      } catch (error) {0
          console.error('Error uploading file:', error);
      }
  };
  return (
    <>
    <div className="App">
            <h1>Upload Resume</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            <div>
                <label>First Name:</label>
                <input type="text" value={firstName} readOnly />
            </div>
            <div>
                <label>Last Name:</label>
                <input type="text" value={lastName} readOnly />
            </div>
        </div>
    </>
  )
}

export default App
