import END_POINTS from '../../constants/endpoints';
import axios from 'axios';
import { BACKEND_URL } from '../../constants/common';

export const getUserById = async (userId) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/${END_POINTS.GET_USER_BY_ID}${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw error;
  }
}

