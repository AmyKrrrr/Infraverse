// src/App.jsx

import React, { useState } from 'react';
import HomePage from './pages/HomePage';
import LoginPopup from './Login/LoginPopup';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  // This new state will track which form to open: 'student', 'teacher', or null
  const [initialUserType, setInitialUserType] = useState(null);

  // For the navbar "Login" button - opens the initial selection screen
  const handleLoginClick = () => {
    setInitialUserType(null); // No pre-selection
    setShowLogin(true);
  };

  // For the "Start Learning" button - opens the student form directly
  const handleStartLearningClick = () => {
    setInitialUserType('student'); // Pre-select 'student'
    setShowLogin(true);
  };

  const handleClosePopup = () => {
    setShowLogin(false);
  };

  return (
    <>
      <HomePage 
        onLoginClick={handleLoginClick} 
        onStartLearningClick={handleStartLearningClick} 
      />

      {/* Conditionally render the popup and pass the initialUserType prop */}
      {showLogin && (
        <LoginPopup 
          onClose={handleClosePopup} 
          initialUserType={initialUserType} 
        />
      )}
    </>
  );
}

export default App;