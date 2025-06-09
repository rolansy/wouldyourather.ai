import axios from 'axios';

// Use environment variable or fallback to the render URL
const API_URL = process.env.REACT_APP_API_URL || 'https://wouldyourather-backend.onrender.com';

// Add request timeout
axios.defaults.timeout = 15000; // 15 seconds

export const getQuestions = () => {
  return axios.get(`${API_URL}/api/questions`);
};

export const createPlayer = (name) => {
  return axios.post(`${API_URL}/api/players`, { name });
};

export const saveResponse = (playerId, questionId, questionText, choice) => {
  return axios.post(`${API_URL}/api/players/${playerId}/responses`, {
    question_id: questionId,
    question_text: questionText,
    choice: choice
  });
};

export const getAnalysis = (playerId) => {
  return axios.get(`${API_URL}/api/players/${playerId}/analysis`);
};