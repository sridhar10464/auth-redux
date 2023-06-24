// Import dependencies
import axios from 'axios';

// Action types
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

// Action creators
export const registerUser = (username, password) => async dispatch => {
  try {
    await axios.post('http://localhost:5000/api/users/register', { username, password });
    dispatch({ type: REGISTER_SUCCESS });
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = (username, password) => async dispatch => {
  try {
    const response = await axios.post('http://localhost:5000/api/users/login', { username, password });
    const token = response.data.token;
    localStorage.setItem('token', token);
    dispatch({ type: LOGIN_SUCCESS });
  } catch (error) {
    console.log(error);
  }
};

export const logoutUser = () => async dispatch => {
  try {
    localStorage.removeItem('token');
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    console.log(error);
  }
};
