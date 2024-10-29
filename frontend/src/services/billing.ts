import axiosInstance from './axiosInstance';

// Function to intiate stripe checkout
export const fetchStripeCheckoutSession = async (data: any) => {
  try {
      const response = await axiosInstance.post('/stripe/create_checkout_session', data);
      return response.data;
  } catch (error) {
    console.error('Error on stripe checkout:', error);
    throw error;
  }
};
