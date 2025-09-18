import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Import all your components
import HomePage from './pages/HomePage';
import LoginPopup from './Login/LoginPopup';
import StudentDashboard from './Dashboard/StudentDashboard';
import TeacherDashboard from './Dashboard/TeacherDashboard';
import Quizzes from './StuDash/Quizzes';
import LiveLectures from './StuDash/LiveLectures';
// Import Courses and Announcements here as well...

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [initialUserType, setInitialUserType] = useState(null);
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setShowLogin(false);
  };

  const handleLogout = () => {
    setUser(null);
  };
  
  // Handlers to open the login popup
  const handleLoginClick = () => {
    setInitialUserType(null);
    setShowLogin(true);
  };

  const handleStartLearningClick = () => {
    setInitialUserType('student');
    setShowLogin(true);
  };

  return (
    <>
      <Routes>
        {/* If user is NOT logged in, show the homepage */}
        <Route 
          path="/" 
          element={
            !user ? (
              <HomePage 
                onLoginClick={handleLoginClick} 
                onStartLearningClick={handleStartLearningClick} 
              />
            ) : (
              // If user IS logged in, redirect them to their dashboard
              <Navigate to={user.role === 'student' ? '/student-dashboard' : '/teacher-dashboard'} />
            )
          } 
        />

        {/* --- Student Routes --- */}
        <Route 
          path="/student-dashboard" 
          element={user?.role === 'student' ? <StudentDashboard onLogout={handleLogout} /> : <Navigate to="/" />} 
        />
        <Route 
          path="/quizzes" 
          element={user?.role === 'student' ? <Quizzes /> : <Navigate to="/" />} 
        />
        <Route 
          path="/live-lectures" 
          element={user?.role === 'student' ? <LiveLectures /> : <Navigate to="/" />} 
        />
        {/* Add Routes for Courses and Announcements here */}

        {/* --- Teacher Route --- */}
        <Route 
          path="/teacher-dashboard" 
          element={user?.role === 'teacher' ? <TeacherDashboard onLogout={handleLogout} /> : <Navigate to="/" />}
        />
      </Routes>

      {/* The Login Popup can still be shown over any page */}
      {showLogin && (
        <LoginPopup 
          onClose={() => setShowLogin(false)} 
          initialUserType={initialUserType}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </>
  );
}

export default App;