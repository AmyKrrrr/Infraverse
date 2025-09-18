import React from 'react';
import './Dashboard.css';

const TeacherDashboard = ({ onLogout }) => {
  return (
    <div className="dashboard-container">
       <header className="dashboard-header">
        <h1>Teacher Dashboard</h1>
        <p>Manage your courses, schedule lectures, and create quizzes.</p>
        <button className="logout-btn" onClick={onLogout}>Logout</button>
      </header>
      <div className="placeholder-content">
        <p>Teacher-specific components will go here.</p>
      </div>
    </div>
  );
};

export default TeacherDashboard;