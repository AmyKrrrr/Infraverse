import React from 'react';
import { Link } from 'react-router-dom';
import './StuDash.css';

const Quizzes = () => {
  return (
    <div className="dash-page-container">
      <Link to="/student-dashboard" className="back-link">&larr; Back to Dashboard</Link>
      <h1>My Quizzes</h1>
      <p>Here are your upcoming and past quizzes.</p>
      {/* Quiz content will go here */}
    </div>
  );
};

export default Quizzes;