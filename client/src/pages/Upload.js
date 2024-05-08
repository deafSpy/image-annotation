import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import ReactDOMServer from 'react-dom/server';
import FileDrop from '../components/FileDrop';
import CategoryDisplay from '../components/CategoryDisplay';
import { uploadS3Data } from "../api/endpoints/s3";
import { makeImageObject, updateImageObject } from "../api/endpoints/image";
import SideGallery from "../components/SideGallery";
import "../styles/upload.css";

function UploadComponent() {
      const [file, setFile] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(0);
    
      const categories = [
    "airplane", "car", "bird", "cat", "deer", "dog", "frog", "horse", "ship", "truck"
  ];

    const handleUpload = (acceptedFiles) => {
        console.log("logging drop/selected file",acceptedFiles);

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
    

    const handleSubmit = async () => {
        console.log(file);
        console.log(selectedCategory);

        const { url } = await fetch("http://localhost:4000/s3URL").then(res => res.json())
        console.log(url)

        await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "multipart/form-data"
            },
            body: file
        })

        const imageURL = url.split("?")[0]
        console.log(imageURL)

        const imageName = imageURL.split(".com/")[1]
        // console.log(imageName)
        const userID = localStorage.getItem("userID")
        // console.log("userID", userID)
        const response2 = await makeImageObject({imageLink: imageName, category: categories[selectedCategory], userID: userID})
        // console.log(response2)
        // const response3 = await updateImageObject({imageId: response2?.data?._id, category: categories[5]})
        // console.log(response3)
    }

  return (

      
    <div style={{ display: 'flex', justifyContent: 'right', alignItems: 'center', marginTop: '0rem', paddingTop: '1.25rem', paddingBottom: '5rem', color: '#1a202c' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', margin: '4rem', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', border: '1px solid transparent', padding: '2rem', width: '100%', maxWidth: '15rem', marginLeft: 'auto', marginRight: 'auto', padding: '2.5rem', minHeight: "75vh" }}>
              <div style={{ display: "flex", flexDirection: "column", marginLeft: 'auto', marginRight: 'auto', width: '100%', maxWidth: '18rem' }}>
                  Check your Annotations here!
                  <SideGallery />
            </div>
        </div>

          <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', margin: '4rem', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', border: '1px solid transparent', padding: '2rem', width: '100%', maxWidth: '30rem', marginLeft: 'auto', marginRight: 'auto', padding: '2.5rem', minHeight: "75vh" }}>
            <div style={{ display: "flex", flexDirection: "column", marginLeft: 'auto', marginRight: 'auto', width: '100%', maxWidth: '18rem' }}>

                  <FileDrop file={file} setFile={setFile} handleUpload={handleUpload} />
                  <div className="button-wrapper flex-row">
                    <CategoryDisplay selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                    <button onClick={handleSubmit} className="submit-button center">
                        Submit
                    </button>
                  </div>
            </div>
        </div>
    </div>

  );
}

export default UploadComponent;
