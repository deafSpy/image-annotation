import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Grid, TextField, Button } from '@mui/material';
import { getAllImageObjects } from '../api/endpoints/image';
import "../styles/gallery.css"
import GalleryCard from '../components/GalleryCard';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const Gallery = () => {
  const { isLoggedIn, account } = useAuth();
  const [images, setImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterUserImages, setFilterUserImages] = useState(false);

  useEffect(() => {
    fetchImages();
  }, [filterUserImages]);

    const fetchImages = async () => {
        try {
            const response = await getAllImageObjects();
            console.log(response)
            setImages(response.data);

            toast.success("Images fetched successfully", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        } catch (error) {
            toast.error(error.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }
    
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = () => {
    setFilterUserImages(!filterUserImages);
  };

    const filteredImages = images.filter(image => image.category.toLowerCase().includes(searchTerm.toLowerCase()))



  return (
    <div className='gallery-wrapper'>
      <TextField
        label="Search by tags"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
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
                <GalleryCard image={image} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Gallery;
