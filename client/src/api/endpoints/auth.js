import axios from 'axios';
import { BACKEND_URL } from '../../constants/common';
import END_POINTS from '../../constants/endpoints';


const login = async (credentials) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/${END_POINTS.LOGIN}`, credentials);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Failed to login');
  }
};

const register = async (credentials) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/${END_POINTS.REGISTER}`, credentials);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Failed to register');
  }
};

const logout = async () => {
  try {
    const response = await axios.post(`${BACKEND_URL}/${END_POINTS.LOGOUT}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Failed to logout');
  }
};

export { login, register, logout };
