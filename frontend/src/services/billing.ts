import axiosInstance from './axiosInstance';

// Function to intiate stripe checkout
export const fetchStripeCheckoutSession = async (data: any) => {
  try {
    const response = await axiosInstance.post(
      '/billing/create_checkout_session',
      data
    );
    return response.data;
  } catch (error) {
    console.error('Error on stripe checkout:', error);
    throw error;
  }
};

export const fetchBillingCredits = async () => {
  try {
    const response = await axiosInstance.get('/billing/credits');
    return response.data;
  } catch (error) {
    console.error('Error in fetching billing credits');
    throw error;
  }
};
