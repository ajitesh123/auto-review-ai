import axiosInstance from './axiosInstance';

// Function to generate performance review
export const generateReview = async (data: any) => {
  try {
    const response = await axiosInstance.post('/generate_review', data);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};

// Function to generate self review
export const generateSelfReview = async (data: any) => {
  try {
    const response = await axiosInstance.post('/generate_self_review', data);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};
