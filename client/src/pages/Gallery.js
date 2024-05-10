import React, { useState, useEffect, useReducer } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Grid, TextField, Button } from '@mui/material';
import { getAllImageObjects } from '../api/endpoints/image';
import "../styles/gallery.css"
import GalleryCard from '../components/GalleryCard';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import gsap from 'gsap';


const Gallery = () => {
  const { isLoggedIn, account } = useAuth();
  const [images, setImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTerm2, setSearchTerm2] = useState('');
    const [filterUserImages, setFilterUserImages] = useState(false);
    const [filteredImages, setFilteredImages] = useState([]);

    const [doUpdate, setDoUpdate] = useState(false)

const [, forceUpdate] = useReducer(x => x + 1, 0);

  useEffect(() => {
      fetchImages();
  }, []);

    const fetchImages = async () => {
        try {
            const response = await getAllImageObjects();
            console.log(response)
            setFilteredImages(response.data);
            setImages(response.data)
            gsap.from('.gallery-card', { duration: 0.5, opacity: 0, y: 30, stagger: 0.05, ease: 'power3.out' });


            toast.success("Images fetched successfully", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        } catch (error) {
            toast.error(error.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }
    
  };

    const handleSearchChange = (event, searchType) => {
        const searchTermValue = event.target.value;
        let thing = 1;
        if (searchType === "category") {
            setSearchTerm(searchTermValue);
            thing = 0;
        } else if (searchType === "username") {
            setSearchTerm2(searchTermValue);
            thing = 1
        }

        const searchTermValue1 = thing ? searchTerm : searchTermValue
        const searchTermValue2 = !thing ? searchTerm2 : searchTermValue

        if (searchTermValue1 === "" && searchTermValue2 === "") {
            setFilteredImages(images);
        } else {
            let filteredResults = images.filter((image) => {
                const categoryMatch = searchTermValue1 ? image.category.toLowerCase().includes(searchTermValue1.toLowerCase()) : true;
                const usernameMatch = searchTermValue2 ? image.username.toLowerCase().includes(searchTermValue2.toLowerCase()) : true;
                return categoryMatch && usernameMatch;
            });
            setFilteredImages(filteredResults);
            console.log(filteredResults);
            forceUpdate();
            setDoUpdate(!doUpdate);
        }
    };


  const handleFilterChange = () => {
    setFilterUserImages(!filterUserImages);
  };
    




    return (
      <>
    <div className='gallery-wrapper'>
      <TextField
        label="Search by tags"
        variant="outlined"
        value={searchTerm}
        onChange={(event) => handleSearchChange(event, "category")}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Search by Username"
        variant="outlined"
        value={searchTerm2}
        onChange={(event) => handleSearchChange(event, "username")}
        fullWidth
        margin="normal"
      />
      {isLoggedIn && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleFilterChange}
          style={{ marginBottom: '20px' }}
        >
          {filterUserImages ? 'Show All Images' : 'Show My Images Only'}
        </Button>
      )}
      <Grid container spacing={2} className="gallery-grid">
        {filteredImages.map((image, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
                <GalleryCard image={image} type="gallery" update={doUpdate} className="gallery-card" />
          </Grid>
        ))}
      </Grid>
                </div>
                </>
  );
};

export default Gallery;
