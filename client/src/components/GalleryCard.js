import React, { useState, useRef, useEffect } from "react";

function GalleryCard({ image }) {
    const canvasRef = useRef(null)
    const [imageLink, setImageLink] = useState(image.imageLink)
    console.log(image.imageLink)

    const colors1 = ["#167288", "#b45248", "#a89a49", "#3cb464"]
    const colors2 = ["#8cdaec", "#d48c84", "#d6cfa2", "#9bddb1"]
        
    const categories = {
        "airplane": 0, "car": 1, "bird": 2, "cat": 3, "deer": 4, "dog": 5, "frog": 6, "horse": 7, "ship": 8, "truck": 9
    };

    const baseURL = "https://image-annotation-equitable.s3.ap-southeast-2.amazonaws.com"


    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const image = new Image();
        image.src = `${baseURL}/${imageLink}`;
        console.log(image.src)
        image.onload = () => {
            ctx.drawImage(image, 0, 0, 200, 200);
        };


    }, [])

    return (
        <div className="gallery-card">
            <div className="gallery-card-image">
                <div className="gallery-card-item" style={{backgroundColor: colors2[categories[image.category] % 4], borderColor: colors1[categories[image.category] % 4]}}>{image.category}</div>
                {(
                    <canvas ref={canvasRef} width="200" height="200"></canvas>
                )}
            </div>
        </div>
    )
}

export default GalleryCard