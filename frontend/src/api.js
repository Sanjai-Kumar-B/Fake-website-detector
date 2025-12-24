import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const analyzeUrl = async (url) => {
  try {
    const response = await axios.post(`${API_URL}/analyze`, { url });
    return response.data;
  } catch (error) {
    console.error("Error analyzing URL:", error);
    throw error;
  }
};
