import axiosInstance from './axiosInstance';

// Fetch user details
export const fetchUserDetails = async () => {
  try {
    const response = await axiosInstance.get('/user_details');
    return response.data;
  } catch (error) {
    console.error('Error in fetching user details');
    throw error;
  }
};
