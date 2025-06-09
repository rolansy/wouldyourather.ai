import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPlayer } from '../services/api';

function Home({ setPlayerId }) {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const response = await createPlayer(name);
      setPlayerId(response.data.player_id);
      navigate('/game');
    } catch (error) {
      console.error('Error creating player:', error);
      if (error.response) {
        setError(`Server error: ${error.response.status}. Please try again.`);
      } else if (error.request) {
        setError('No response from server. Please check your connection.');
      } else {
        setError('Failed to start the game. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="home-container">
      <h1>Would You Rather?</h1>
      <p>Answer 5 impossible choices and get an AI analysis of your personality!</p>
      
      {error && <div className="error-message">{error}</div>}
      
      <form className="name-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading || !name.trim()}>
          {isLoading ? 'Starting...' : 'Start Game'}
        </button>
      </form>
    </div>
  );
}

export default Home;