import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Game({ playerId }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if no playerId
    if (!playerId) {
      navigate('/');
      return;
    }

    // Fetch questions
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('/api/questions?count=5');
        setQuestions(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching questions:', error);
        alert('Failed to load questions. Please try again.');
        navigate('/');
      }
    };

    fetchQuestions();
  }, [playerId, navigate]);

  const handleChoice = async (choice) => {
    if (currentQuestion >= questions.length) return;

    const question = questions[currentQuestion];
    
    try {
      await axios.post(`/api/players/${playerId}/responses`, {
        question_id: question._id,
        question_text: question.question,
        choice: choice === 'A' ? question.option_A : question.option_B
      });

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        navigate('/results');
      }
    } catch (error) {
      console.error('Error saving response:', error);
      alert('Failed to save your choice. Please try again.');
    }
  };

  if (isLoading) {
    return <div className="loading">Loading questions...</div>;
  }

  if (questions.length === 0) {
    return <div className="error">No questions available. Please try again later.</div>;
  }

  const question = questions[currentQuestion];

  return (
    <div className="game-container">
      <div className="progress">
        Question {currentQuestion + 1} of {questions.length}
      </div>
      
      <div className="question-card">
        <h2>{question.question}</h2>
        
        <div className="options">
          <button 
            className="option option-a" 
            onClick={() => handleChoice('A')}
          >
            {question.option_A}
          </button>
          
          <div className="or-divider">OR</div>
          
          <button 
            className="option option-b" 
            onClick={() => handleChoice('B')}
          >
            {question.option_B}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Game;