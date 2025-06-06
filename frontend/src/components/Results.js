import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAnalysis } from '../services/api';

function Results({ playerId }) {
  const [analysis, setAnalysis] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if no playerId
    if (!playerId) {
      navigate('/');
      return;
    }

    const fetchAnalysis = async () => {
      try {
        setIsLoading(true);
        const response = await getAnalysis(playerId);
        setAnalysis(response.data.analysis);
      } catch (error) {
        console.error('Error fetching analysis:', error);
        setAnalysis('Sorry, we could not generate your analysis at this time. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalysis();
  }, [playerId, navigate]);

  const handlePlayAgain = () => {
    navigate('/');
  };

  return (
    <div className="results-container">
      <h1>Your Analysis</h1>
      
      {isLoading ? (
        <div className="loading-analysis">
          <p>Our AI is analyzing your choices...</p>
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <div className="analysis-card">
          <div className="analysis-content">
            {analysis}
          </div>
        </div>
      )}
      
      <button className="play-again-btn" onClick={handlePlayAgain}>
        Play Again
      </button>
    </div>
  );
}

export default Results;