import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Home({ setPlayerId }) {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsLoading(true);
    try {
      const response = await axios.post('/api/players', { name });
      setPlayerId(response.data.player_id);
      navigate('/game');
    } catch (error) {
      console.error('Error creating player:', error);
      alert('Failed to start the game. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="home-container">
      <h1>Would You Rather?</h1>
      <p>Answer 5 random "Would You Rather" questions and discover what your choices say about you!</p>
      
      <form onSubmit={handleSubmit} className="name-form">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          required
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading || !name.trim()}>
          {isLoading ? 'Loading...' : 'Start Game'}
        </button>
      </form>
    </div>
  );
}

export default Home;