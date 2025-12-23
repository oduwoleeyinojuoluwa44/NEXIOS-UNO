import axios from 'axios';

// Ensure we pick up the VITE_API_BASE_URL from the environment
const baseURL = process.env.VITE_API_BASE_URL || '';

const api = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check if it's a 405 Method Not Allowed - often happens if baseURL is wrong
    if (error.response?.status === 405) {
      console.error('Method Not Allowed: Check if the endpoint and HTTP method (GET/POST/PUT/PATCH/DELETE) are correct.');
    }
    
    if (error.response?.status === 401) {
      window.dispatchEvent(new CustomEvent('auth:unauthorized'));
    }
    return Promise.reject(error);
  }
);

export default api;