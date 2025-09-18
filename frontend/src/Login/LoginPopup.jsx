import React, { useState } from 'react';
import AuthForm from './AuthForm';
import './LoginPopup.css';

// 1. Accept onLoginSuccess as a prop here
const LoginPopup = ({ onClose, initialUserType = null, onLoginSuccess }) => {
  const [userType, setUserType] = useState(initialUserType);
  const [formType, setFormType] = useState('login');

  const handleBack = () => {
    setUserType(null);
    setFormType('login');
  };

  const renderUserSelection = () => (
    <div className="user-selection">
      <h2>Welcome!</h2>
      <p>Please select your role to continue.</p>
      <div className="button-group">
        <button className="btn btn-primary" onClick={() => setUserType('student')}>
          I am a Student
        </button>
        <button className="btn btn-secondary" onClick={() => setUserType('teacher')}>
          I am a Teacher
        </button>
      </div>
    </div>
  );

  const renderAuthView = () => (
    <div className="auth-view">
      <button className="back-btn" onClick={handleBack}>&larr; Back</button>
      <h2>
        {userType.charAt(0).toUpperCase() + userType.slice(1)}{' '}
        {formType === 'login' ? 'Login' : 'Register'}
      </h2>

      {/* 2. Pass onLoginSuccess down to the AuthForm component */}
      <AuthForm 
        userType={userType} 
        formType={formType} 
        onLoginSuccess={onLoginSuccess} 
      />
      
    </div>
  );

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>&times;</button>
        {!userType ? renderUserSelection() : renderAuthView()}
      </div>
    </div>
  );
};

export default LoginPopup;