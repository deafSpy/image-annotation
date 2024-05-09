import axios from 'axios';
import { BACKEND_URL } from '../../constants/common';
import END_POINTS from '../../constants/endpoints';


const makeImageObject = async ({imageLink, category, userID, username}) => {
const data = JSON.stringify({
    imageLink: imageLink,
    category: category,
    userID: userID,
    username
})
    
    console.log(category)
    
    console.log(data)
  try {
      const response = await axios.post(`${BACKEND_URL}/${END_POINTS.CREATE_IMAGE}`, data, {
        headers: {
            "Content-Type": "application/json"
        }
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

const getImageObject = async ({imageId}) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/${END_POINTS.GET_IMAGE}/${imageId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching image:', error);
    throw error;
  }
};

const getAllImageObjectsByUser = async ({userId}) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/${END_POINTS.GET_IMAGES_BY_USER_ID}/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all images by user:', error);
    throw error;
  }
};


const getAllImageObjects = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/${END_POINTS.GET_ALL_IMAGES}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all images:', error);
    throw error;
  }
};

const updateImageObject = async ({ imageId, category }) => {
    console.log(imageId, category)
    const data = JSON.stringify({
        category: category
    })
  try {
    const response = await axios.put(`${BACKEND_URL}/${END_POINTS.UPDATE_IMAGE}/${imageId}`, data, {
        headers: {
            "Content-Type": "application/json"
        }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating image:', error);
    throw error;
  }
};


const deleteImageObject = async ({ imageId }) => {
    console.log(imageId)
  try {
    const response = await axios.delete(`${BACKEND_URL}/${END_POINTS.DELETE_IMAGE}/${imageId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
};

export {
    makeImageObject,
    updateImageObject, 
    deleteImageObject,
    getImageObject,
    getAllImageObjectsByUser, 
    getAllImageObjects, 
};

