import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPlayer } from '../services/api';

function Home({ setPlayerId }) {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name.trim()) {
      alert('Please enter your name');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await createPlayer(name);
      setPlayerId(response.data.player_id);
      navigate('/game');
    } catch (error) {
      console.error('Error creating player:', error);
      alert('Failed to start game. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="home-container">
      <h1>Would You Rather?</h1>
      <p>Answer 5 impossible choices and get an AI analysis of your personality!</p>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Starting...' : 'Start Game'}
        </button>
      </form>
    </div>
  );
}

export default Home;