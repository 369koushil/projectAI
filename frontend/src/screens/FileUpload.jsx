import React, { useState } from 'react';

const FileUpload = () => {
  const [file, setFile] = useState(null);

  // Handle file input change
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  // Handle file upload (e.g., using axios or fetch)
  const handleFileUpload = async () => {
    if (!file) {
      alert('Please choose a file to upload.');
      return;
    }

    // You can now proceed to upload the file to the server
    console.log('File selected:', file);
  };

  return (
    <div>
      <h1>Upload File</h1>
      
      {/* File Input Element */}
      <input
        type="file"  // This opens the file explorer when clicked
        onChange={handleFileChange}  // Handle the file selection
      />
      
      {/* Display selected file info */}
      {file && <p>Selected file: {file.name}</p>}

      {/* Button to trigger file upload */}
      <button onClick={handleFileUpload}>Upload</button>
    </div>
  );
};

export default FileUpload;
