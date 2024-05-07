import React, { useState } from 'react';

function UploadComponent() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      // You can replace this URL with your actual upload endpoint
      const uploadURL = 'http://example.com/upload';
      fetch(uploadURL, {
        method: 'POST',
        body: formData,
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="fileUpload">Upload file:</label>
        <input type="file" id="fileUpload" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {file && <p>File ready to upload: {file.name}</p>}
    </div>
  );
}

export default UploadComponent;
