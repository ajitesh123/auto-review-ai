import axiosInstance from './axiosInstance';

// Function to transcribe audio blob
export const transcribeAudioBlob = async (data: FormData) => {
  try {
    const response = await axiosInstance.post('/transcribe_audio', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};
