import React, { useEffect, useState } from "react";
import { getAllImageObjectsByUser } from "../api/endpoints/image";
import "../styles/sideGallery.css"
import Cross from "./Cross";
import Edit from "./Edit";
import { toast } from "react-toastify";

import { deleteImageObject, updateImageObject } from "../api/endpoints/image";

const SideGallery = (handleUpload) => {
    const [images, setImages] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [account, setAccount] = useState(null);

    const baseURL = "https://image-annotation-equitable.s3.ap-southeast-2.amazonaws.com"

    const colors1 = ["#167288", "#b45248", "#a89a49", "#3cb464"]
    const colors2 = ["#8cdaec", "#d48c84", "#d6cfa2", "#9bddb1"]

    const colors = ["#167288", "#b45248", "#a89a49", "#3cb464",
        "#8cdaec", "#d48c84", "#d6cfa2", "#9bddb1"]
    
    const categories = {
        "airplane": 0, "car": 1, "bird": 2, "cat": 3, "deer": 4, "dog": 5, "frog": 6, "horse": 7, "ship": 8, "truck": 9
    };

    useEffect(async () => {

        const account1 = localStorage.getItem("account")

        if (account1 !== null) {
            try {
                console.log(account1)
                setAccount(JSON.parse(account1))
                setIsLoggedIn(true)
                console.log(account)
    
                const objects = await getAllImageObjectsByUser({ userId: account.id })
                console.log(objects.data)
                setImages(objects.data)

            }

            catch {
                toast.error("Error fetching images", {
                position: toast.POSITION.BOTTOM_RIGHT,
                })
            }

        }


    }, [])

    const handleDelete = async (id) => {
        console.log(id)
        await deleteImageObject({imageId: id})
        setImages(images.filter(image => image._id !== id))
    }

    const handleEdit = async (index) => {
        // localStorage.setItem("isEdit", true)
        // handleUpload(images[index])
        await updateImageObject({imageId: id})
    }


    return (
    <>
        {isLoggedIn ? <div>
            {images.length === 0 ? <p>Loading...</p> :
                images.map((image, i) => (
                    <div key={image._id} className="SideGallery-container">
                        <img src={`${baseURL}/${image.imageLink}`} alt={image.category} style={{maxWidth: "12vw"}} />
                        <div className="SideGallery-item" style={{backgroundColor: colors2[categories[image.category] % 4], borderColor: colors1[categories[image.category] % 4]}}>{image.category}</div>
                        <div className="options-wrapper">
                            <Cross onClick={() => handleDelete(image._id)} />
                            {/* <Edit onClick={() => handleEdit(image._id)} /> */}
                        </div>

                    </div>
                ))}
        </div > : <p>Your Uploads will be displayed here</p>}
        </>
    )
}

export default SideGallery;

