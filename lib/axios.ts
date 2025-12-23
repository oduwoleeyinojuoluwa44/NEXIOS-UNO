import axios from 'axios';

// In this environment, environment variables are available on process.env
const baseURL = process.env.VITE_API_BASE_URL;

if (!baseURL && process.env.NODE_ENV === 'development') {
  console.warn('VITE_API_BASE_URL is not defined. API calls will use relative paths which may cause 405 errors.');
}

const api = axios.create({
  baseURL: baseURL || '',
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