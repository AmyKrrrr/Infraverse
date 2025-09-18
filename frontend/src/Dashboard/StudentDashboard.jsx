import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import './Dashboard.css';
import { FaBook, FaVideo, FaClipboardList, FaBullhorn } from 'react-icons/fa';

const StudentDashboard = ({ onLogout }) => {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Student Dashboard</h1>
        <p>Welcome back! Choose an option below to get started.</p>
        <button className="logout-btn" onClick={onLogout}>Logout</button>
      </header>

      <div className="dashboard-grid">
        {/* Changed from button to Link */}
        <Link to="/quizzes" className="dashboard-card">
          <FaClipboardList className="card-icon" />
          <span>Quizzes</span>
        </Link>
        <Link to="/live-lectures" className="dashboard-card">
          <FaVideo className="card-icon" />
          <span>Live Lectures</span>
        </Link>
        <Link to="/courses" className="dashboard-card">
          <FaBook className="card-icon" />
          <span>Courses</span>
        </Link>
        <Link to="/announcements" className="dashboard-card">
          <FaBullhorn className="card-icon" />
          <span>Announcements</span>
        </Link>
      </div>
    </div>
  );
};

export default StudentDashboard;