import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom'; // Placeholder, as we're not using react-router-dom yet

function StudentView({ sessionId }) {
  const [isMuted, setIsMuted] = useState(false);
  const [screenshotUrl, setScreenshotUrl] = useState('');
  const [isAudioLive] = useState(true);

  useEffect(() => {
    // Simulate receiving new screenshots every 5 seconds
    const screenshotInterval = setInterval(() => {
      // In a real app, this would be the actual screenshot received from the C++ engine
      const mockScreenshotUrl = `https://picsum.photos/800/600?random=${Math.random()}`;
      setScreenshotUrl(mockScreenshotUrl);
      console.log('New screenshot received!');
    }, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(screenshotInterval);
  }, []); // Run once on component mount

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="w-full bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold">Student View</h1>
        <span className="text-sm font-light">Session ID: <span className="font-mono">{sessionId}</span></span>
      </header>

      {/* Main Content Area - Screenshot Display */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="bg-gray-200 w-full max-w-4xl rounded-lg shadow-xl overflow-hidden flex items-center justify-center">
          {screenshotUrl ? (
            <img src={screenshotUrl} alt="Live Classroom Screenshot" className="w-full h-auto object-contain" />
          ) : (
            <div className="w-full h-96 flex items-center justify-center text-gray-400 text-xl font-light">
              Waiting for the first screenshot...
            </div>
          )}
        </div>
      </main>

      {/* Footer - Controls */}
      <footer className="w-full bg-white shadow-md p-4 flex justify-center items-center space-x-4">
        <button
          onClick={toggleMute}
          className={`px-6 py-2 rounded-full transition-colors ${isMuted ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-red-500 hover:bg-red-600 text-white'}`}
        >
          {isMuted ? 'Unmute Playback' : 'Mute Playback'}
        </button>
        <div className="flex items-center space-x-2 text-sm">
          <div className={`w-2 h-2 rounded-full ${isAudioLive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
          <span>{isAudioLive ? 'Audio Stream Live' : 'Audio Stream Offline'}</span>
        </div>
      </footer>
    </div>
  );
}

export default StudentView;