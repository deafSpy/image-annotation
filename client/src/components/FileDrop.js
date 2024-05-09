import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import "../styles/fileDrop.css";
import { useRef, useEffect } from 'react';

function FileDrop({ file, setFile, handleUpload }) {
    const canvasRef = useRef(null);

    
    useEffect(() => {
        if (file) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const image = new Image();
            image.src = URL.createObjectURL(file);
            image.onload = () => {
                ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
            };
        }

    }, [file])


    return (
        <div className="fileDrop">
            
            <Dropzone onDrop={handleUpload} maxSize={3072000}>
                        {({ getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject }) => {
                            // const additionalClass = isDragAccept ? "accept" : isDragReject ? "reject" : "";

                            return (
                                <div
                                    {...getRootProps({
                                        className: `dropzone center`,
                                    })}
                                >
                                    <input {...getInputProps()} />
                                    <img src={"https://res.cloudinary.com/dzeil57n4/image/upload/v1715130097/4147103_n7j55q.png"}
                                        alt="upload"
                                        style={{maxHeight: "30px", width: "auto", marginRight: "5px"}}
                                    />
                                    <p className="dropzone-text"><b>Click to upload</b> or Drag and drop</p>
                                </div>
                            );
                        }}
            </Dropzone>
            <div className="image-display">
                {file && (
                    <canvas ref={canvasRef} width="500" height="500" style={{ borderRadius: "8px" }}></canvas>
                )}
            </div>
                
        </div>
    )

}
            

export default FileDrop;

