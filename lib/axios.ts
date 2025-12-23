import axios from 'axios';

const api = axios.create({
  // Fix for environment type resolution: @ts-ignore
  baseURL: process.env.VITE_API_BASE_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Logic for 401: clear local state via custom event or context update
      window.dispatchEvent(new CustomEvent('auth:unauthorized'));
    }
    return Promise.reject(error);
  }
);

export default api;