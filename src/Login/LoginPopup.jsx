import React, { useState } from "react";
import AuthForm from "./AuthForm";
import "./LoginPopup.css";

const LoginPopup = ({ onClose, initialUserType = null }) => {
  // Use the prop to set the initial state
  const [userType, setUserType] = useState(initialUserType); 
  const [formType, setFormType] = useState('login');

  // Handler to go back to the initial user type selection
  const handleBack = () => {
    setUserType(null);
    setFormType("login"); // Reset to login form
  };

  // Render the initial choice screen
  const renderUserSelection = () => (
    <div className="user-selection">
      <h2>Welcome!</h2>
      <p>Please select your role to continue.</p>
      <div className="button-group">
        <button
          className="btn btn-primary"
          onClick={() => setUserType("student")}
        >
          I am a Student
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => setUserType("teacher")}
        >
          I am a Teacher
        </button>
      </div>
    </div>
  );

  // Render the Login/Register form view
  const renderAuthView = () => (
    <div className="auth-view">
      <button className="back-btn" onClick={handleBack}>
        &larr; Back
      </button>
      <h2>
        {userType.charAt(0).toUpperCase() + userType.slice(1)}{" "}
        {formType === "login" ? "Login" : "Register"}
      </h2>
      <AuthForm userType={userType} formType={formType} />
    </div>
  );

  return (
    // The modal overlay
    <div className="popup-overlay" onClick={onClose}>
      {/* The modal content, stopPropagation prevents closing when clicking inside */}
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        {/* Conditionally render based on whether a user type has been chosen */}
        {!userType ? renderUserSelection() : renderAuthView()}
      </div>
    </div>
  );
};

export default LoginPopup;
