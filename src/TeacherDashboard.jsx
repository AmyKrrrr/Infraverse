import React, { useState } from 'react';

function TeacherDashboard() {
  const [isSessionLive, setIsSessionLive] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const [stats, setStats] = useState({
    latency: 'N/A',
    packetLoss: 'N/A',
    studentsConnected: 0,
  });
  const [quizText, setQuizText] = useState('');
  const [generatedQuiz, setGeneratedQuiz] = useState(null);
  const [isLoadingQuiz, setIsLoadingQuiz] = useState(false);

  const startSession = () => {
    const newSessionId = Math.random().toString(36).substring(2, 8);
    setSessionId(newSessionId);
    setIsSessionLive(true);

    const statUpdateInterval = setInterval(() => {
      setStats(() => ({
        latency: `${Math.floor(Math.random() * 200) + 50} ms`,
        packetLoss: `${(Math.random() * 2).toFixed(1)}%`,
        studentsConnected: Math.floor(Math.random() * 10),
      }));
    }, 3000);

    return () => clearInterval(statUpdateInterval);
  };

  const stopSession = () => {
    setIsSessionLive(false);
    setSessionId('');
    setStats({
      latency: 'N/A',
      packetLoss: 'N/A',
      studentsConnected: 0,
    });
  };

  const handleGenerateQuiz = async () => {
    setIsLoadingQuiz(true);
    try {
      const response = await fetch('http://localhost:5000/generate-quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: quizText }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setGeneratedQuiz(data.questions);
      console.log('Quiz generated:', data.questions);
    } catch (error) {
      console.error('Error generating quiz:', error);
      alert('Failed to generate quiz. Check the server console for details.');
    } finally {
      setIsLoadingQuiz(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      <header className="w-full bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Teacher Dashboard</h1>
        <div className="flex items-center space-x-4">
          {isSessionLive && (
            <span className="text-gray-600">Session ID: <span className="font-mono font-bold text-blue-600">{sessionId}</span></span>
          )}
          {isSessionLive ? (
            <button
              onClick={stopSession}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
            >
              End Session
            </button>
          ) : (
            <button
              onClick={startSession}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              Start Session
            </button>
          )}
        </div>
      </header>

      <main className="flex-1 p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className={`bg-white p-6 rounded-lg shadow-md col-span-2 ${!isSessionLive && 'opacity-50 pointer-events-none'}`}>
          <h2 className="text-lg font-semibold mb-4">Live Session Controls</h2>
          <div className="flex flex-col space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
                Stop Audio
              </button>
              <button className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600">
                Take Screenshot
              </button>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-100 rounded-md">
              <label htmlFor="auto-screenshot" className="text-gray-700">Auto-screenshot Toggle</label>
              <input type="checkbox" id="auto-screenshot" className="form-checkbox h-5 w-5 text-purple-600" />
            </div>
            {isSessionLive && (
              <div className="p-4 bg-yellow-100 rounded-md border-l-4 border-yellow-500 text-yellow-800">
                <p>Share this link with your students: <span className="font-mono text-sm font-bold">http://localhost:5173/student/{sessionId}</span></p>
              </div>
            )}
          </div>
        </div>

        <div className={`bg-white p-6 rounded-lg shadow-md ${!isSessionLive && 'opacity-50'}`}>
          <h2 className="text-lg font-semibold mb-4">Stream Stats</h2>
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between items-center">
              <span>Latency:</span>
              <span className="font-semibold">{stats.latency}</span>
            </li>
            <li className="flex justify-between items-center">
              <span>Packet Loss:</span>
              <span className="font-semibold">{stats.packetLoss}</span>
            </li>
            <li className="flex justify-between items-center">
              <span>Students Connected:</span>
              <span className="font-semibold">{stats.studentsConnected}</span>
            </li>
          </ul>
        </div>
      </main>

      {/* Quiz Generator Section */}
      <div className="mt-8 p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Quiz Generator</h2>
        <p className="text-gray-600 mb-6">Paste your lecture notes or text below to automatically generate a quiz.</p>
        <div className="flex flex-col space-y-4">
          <textarea
            className="w-full h-48 p-4 border rounded-md resize-y focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Paste your content here..."
            value={quizText}
            onChange={(e) => setQuizText(e.target.value)}
          ></textarea>
          <button
            onClick={handleGenerateQuiz}
            disabled={!quizText.trim() || isLoadingQuiz}
            className={`px-6 py-3 rounded-md font-semibold text-white transition-colors ${!quizText.trim() || isLoadingQuiz ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
          >
            {isLoadingQuiz ? 'Generating Quiz...' : 'Generate Quiz'}
          </button>
        </div>

        {generatedQuiz && (
          <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-lg font-bold mb-4">Generated Quiz</h3>
            {generatedQuiz.map((item, index) => (
              <div key={index} className="mb-6 pb-6 border-b border-gray-200 last:border-b-0">
                <p className="font-semibold text-gray-800 mb-2">
                  <span className="text-indigo-600 mr-2">{index + 1}.</span>
                  {item.question}
                </p>
                <ul className="list-none space-y-1 ml-4 text-sm text-gray-700">
                  {item.options.map((option, idx) => (
                    <li key={idx}>
                      {item.type === 'fill_in_the_blank' && option === item.correct_answer ? (
                        <span className="font-bold text-green-600">Answer: {option}</span>
                      ) : (
                        <>
                          <span className="font-medium">{option}</span>
                          {item.type !== 'fill_in_the_blank' && item.correct_answer === option && <span className="ml-2 font-bold text-green-600">(Correct)</span>}
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default TeacherDashboard;
