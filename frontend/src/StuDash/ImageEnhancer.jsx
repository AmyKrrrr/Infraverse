import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import apiService from '../services/api';

const ImageEnhancer = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleFileSelect = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleEnhance = async () => {
    if (!selectedFile) return;
    try {
      const response = await apiService.enhanceImage(selectedFile);
      setResult(response);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="dash-page-container">
      <Link to="/student-dashboard" className="back-link">&larr; Back to Dashboard</Link>
      <h1>AI Image Enhancer</h1>
      
      <div style={{ background: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <h3>Upload Image</h3>
        <input type="file" accept="image/*" onChange={handleFileSelect} style={{ marginBottom: '15px' }} />
        
        {selectedFile && (
          <div>
            <p>Selected: {selectedFile.name}</p>
            <button onClick={handleEnhance} style={{ backgroundColor: '#28a745', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px' }}>
              Enhance Image
            </button>
          </div>
        )}
      </div>

      {result && (
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px' }}>
          <h3>Enhancement Result</h3>
          <p><strong>Status:</strong> {result.message}</p>
          <p><strong>Original:</strong> {result.originalFileName}</p>
          <p><strong>Enhanced:</strong> {result.enhancedFileName}</p>
          <p><strong>Improvement:</strong> {result.improvement}</p>
        </div>
      )}
    </div>
  );
};

export default ImageEnhancer;