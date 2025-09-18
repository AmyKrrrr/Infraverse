import React from 'react';
import { Link } from 'react-router-dom';
import './StuDash.css';

const LiveLectures = () => {
  return (
    <div className="dash-page-container">
      <Link to="/student-dashboard" className="back-link">&larr; Back to Dashboard</Link>
      <h1>Live Lectures</h1>
      <p>Join your scheduled live lectures here.</p>
    </div>
  );
};

export default LiveLectures;