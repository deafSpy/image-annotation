import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import "../styles/fileDrop.css";

function FileDrop() {

      const [file, setFile] = useState(null);

  const handleUpload = (acceptedFiles) => {
    console.log("logging drop/selected file",acceptedFiles);
    // fake request to upload file
    const url = "https://api.escuelajs.co/api/v1/files/upload";
    const formData = new FormData();
    formData.append("file", acceptedFiles[0]); // Assuming you only accept one file

    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          // File uploaded successfully
          setFile(acceptedFiles[0]);
        } else {
          // File upload failed
          console.error(response);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };


    return (
        <>
            {
            !file ? <Dropzone onDrop={handleUpload} accept="image/*" maxSize={3072000}>
                        {({ getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject }) => {
                            const additionalClass = isDragAccept ? "accept" : isDragReject ? "reject" : "";

                            return (
                                <div
                                    {...getRootProps({
                                        className: `dropzone ${additionalClass}`,
                                    })}
                                >
                                    <input {...getInputProps()} />
                                    <p>Drag'n'drop images, or click to select files</p>
                                </div>
                            );
                        }}
                    </Dropzone>
                    : (
                        <>
                            <h4>File Uploaded Successfully !!</h4>
                            
                        </>
            )}
        </>
    )

}

export default FileDrop;

