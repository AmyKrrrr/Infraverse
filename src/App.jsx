import React from 'react';
import { useAuth } from './AuthContext';
import Homepage from './Homepage/Homepage';
import TeacherDashboard from './TeacherDashboard';
import StudentView from './StudentView';

function App() {
  const { user } = useAuth();
  const path = window.location.pathname;

  if (user === 'teacher') {
    return <TeacherDashboard />;
  }

  if (user === 'student') {
    const sessionId = path.startsWith('/student/') ? path.split('/')[2] : null;
    return <StudentView sessionId={sessionId} />;
  }

  return <Homepage />;
}

export default App;
