import axios from 'axios';

// Create an Axios instance for client-side API calls
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://api.example.com', // Default API URL
  timeout: 10000, // Timeout after 10 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Set up rewuest interceptor to handle authentication
/**
 * Uncomment when needed
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
*/

// Optional: Set up response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('API Error Response:', error.response);
    } else if (error.request) {
      console.error('No Response from API:', error.request);
    } else {
      console.error('Axios Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
