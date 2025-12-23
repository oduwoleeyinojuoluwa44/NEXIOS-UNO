import axios from 'axios';

const api = axios.create({
  // Use optional chaining to safely check for env and VITE_API_BASE_URL
  // This prevents "Cannot read properties of undefined" if import.meta.env is not present
  baseURL: (import.meta as any)?.env?.VITE_API_BASE_URL || '/api',
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