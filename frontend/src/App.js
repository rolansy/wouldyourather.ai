import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Game from './components/Game';
import Results from './components/Results';
import './App.css';

function App() {
  const [playerId, setPlayerId] = useState('');

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home setPlayerId={setPlayerId} />} />
          <Route path="/game" element={<Game playerId={playerId} />} />
          <Route path="/results" element={<Results playerId={playerId} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;