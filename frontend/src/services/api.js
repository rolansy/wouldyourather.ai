import axios from 'axios';

const API_URL = 'https://wouldyourather-backend.onrender.com'; // Your Render backend URL

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