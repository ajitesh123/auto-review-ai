import axiosInstance from './axiosInstance';

// Function to login
export const login = async () => {
  try {
    const response = await axiosInstance.get('/login');
    return response.data;
  } catch (error) {
    console.error('Error fetching login url:', error);
    throw error;
  }
};

// Function to register
export const register = async () => {
  try {
    const response = await axiosInstance.get('/register');
    return response.data;
  } catch (error) {
    console.error('Error fetching register url:', error);
    throw error;
  }
};

// Function to logout
export const logout = async () => {
  try {
    const response = await axiosInstance.get('/logout');
    return response.data;
  } catch (error) {
    console.error('Error fetching logout url:', error);
    throw error;
  }
};

// Function to check isAuthenticated
export const isAuthenticated = async () => {
  try {
    const response = await axiosInstance.get('/is_authenticated');
    return response.data;
  } catch (error) {
    console.error('Error fetching is_authenticated status:', error);
  }
};
