import axios from 'axios';
import Router from 'next/router';

// Create an Axios instance for client-side API calls
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.example.com', // Default API URL
  timeout: 30000, // Timeout after 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Set up request interceptor to handle authentication
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('perf_review_token');
  if (token && config && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Optional: Set up response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (typeof window !== 'undefined') {
        // Client-side only: check for a 401 status code
        if (error.status === 401) {
          // Redirect using window.location to the logout callback page
          window.location.href = '/logout/callback';
        }
      }
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
