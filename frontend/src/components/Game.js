import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getQuestions, saveResponse } from '../services/api';

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
        setIsLoading(true);
        console.log('Fetching questions from:', `${process.env.REACT_APP_API_URL || ''}/api/questions`);
        const response = await getQuestions();
        console.log('Questions response:', response.data);
        
        if (response.data && Array.isArray(response.data) && response.data.length > 0) {
          setQuestions(response.data);
        } else {
          console.error('Invalid questions data format:', response.data);
          throw new Error('No questions available');
        }
      } catch (error) {
        console.error('Error fetching questions:', error);
        alert('Failed to load questions. Please try again.');
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, [playerId, navigate]);

  const handleChoice = async (choice) => {
    if (currentQuestion >= questions.length) return;

    const question = questions[currentQuestion];
    
    try {
      await saveResponse(
        playerId,
        question._id,
        question.question,
        choice === 'A' ? question.option_A : question.option_B
      );

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