// src/axiosConfig.js
import axios from 'axios';

// Create an Axios instance with a base URL
const instance = axios.create({
  baseURL: 'http://localhost:5000' // Update this to your backend URL if different
});

export default instance;
