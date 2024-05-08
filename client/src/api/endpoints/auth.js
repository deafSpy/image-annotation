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

const register = async ({ email, first_name, last_name, username, password }) => {
    const data = JSON.stringify({
        email: email,
        first_name: first_name,
        last_name: last_name,
        username: username,
        password: password
    })
  try {
      const response = await axios.post(`${BACKEND_URL}/${END_POINTS.REGISTER}`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
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
