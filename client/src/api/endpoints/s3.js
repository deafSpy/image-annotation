import axios from 'axios';
import { BACKEND_URL } from '../../constants/common';
import END_POINTS from '../../constants/endpoints';
import S3FileUpload from 'react-s3'

const getS3Data = async (key) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/${END_POINTS.GET_FILE}/${key}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching S3 data:', error);
    throw error;
  }
};

const getAllS3Data = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/${END_POINTS.LIST_ALL_FILES}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all S3 data:', error);
    throw error;
  }
};


const uploadS3Data = async (image) => {
    try {
        let formData = new FormData()
        formData.append('file', image, image.name)
        console.log([...formData])
        const response = await axios.post(`${BACKEND_URL}/${END_POINTS.UPLOAD_FILE}`, formData, {
            headers:
            {
                'Content-Type': `multipart/form-data`
            }
        
        })
    return response.data;
  } catch (error) {
    console.error('Error posting S3 data:', error);
    throw error;
  }
};

const deleteS3Data = async (id) => {
  try {
    const response = await axios.delete(`${BACKEND_URL}/${END_POINTS.DELETE_FILE}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting S3 data:', error);
    throw error;
  }
};

export { getS3Data, uploadS3Data, getAllS3Data, deleteS3Data };
