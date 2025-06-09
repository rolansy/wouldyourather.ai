import axios from 'axios';

// The current implementation has a problem - API_URL should either be:
// 1. In local dev: empty string (to use relative URLs) 
// 2. In production: the full backend URL for CORS requests

// Remove the current variable declaration and use:
const API_URL = '';  // Use relative URLs that the nginx proxy will handle

// For debugging - log the actual endpoints
console.log('API endpoints configured at:', {
  questions: `${API_URL}/api/questions`,
  players: `${API_URL}/api/players` 
});

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