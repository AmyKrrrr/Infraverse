import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import apiService from '../services/api';
import './StuDash.css';

const Quizzes = () => {
  const [generatedQuiz, setGeneratedQuiz] = useState(null);
  const [subject, setSubject] = useState('');
  const [difficulty, setDifficulty] = useState('MEDIUM');

  const handleGenerate = async () => {
    if (!subject) return;
    try {
      const quiz = await apiService.generateQuiz({ subject, difficulty });
      setGeneratedQuiz(quiz);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#FFF1FF', 
      animation: 'fadeIn 0.5s ease-in-out',
      padding: '2rem',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <Link to="/student-dashboard" style={{ 
          color: 'white', 
          textDecoration: 'none', 
          fontSize: '16px',
          marginBottom: '20px',
          display: 'inline-block',
          opacity: '0.9'
        }}>
          ← Back to Dashboard
        </Link>
        
        <h1 style={{ 
          color: 'white', 
          textAlign: 'center', 
          marginBottom: '30px',
          fontSize: '2.5rem',
          textShadow: '0 2px 4px rgba(0,0,0,0.3)'
        }}>AI Quiz Generator</h1>
        
        <div style={{ 
          background: 'white', 
          padding: '30px', 
          borderRadius: '20px', 
          marginBottom: '30px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          border: '1px solid #e1e5e9'
        }}>
          <h3 style={{ 
            color: '#333', 
            marginBottom: '25px',
            fontSize: '1.4rem',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>✨ Generate Your Quiz</h3>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontWeight: '600', 
              color: '#555' 
            }}>📚 Subject:</label>
            <input 
              type="text" 
              value={subject} 
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Mathematics, Science, History, Programming"
              style={{ 
                width: '100%', 
                padding: '12px 16px', 
                margin: '0', 
                border: '2px solid #e1e5e9',
                borderRadius: '10px',
                fontSize: '16px',
                transition: 'border-color 0.3s',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
            />
          </div>
          
          <div style={{ marginBottom: '25px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontWeight: '600', 
              color: '#555' 
            }}>⚡ Difficulty Level:</label>
            <select 
              value={difficulty} 
              onChange={(e) => setDifficulty(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '12px 16px', 
                border: '2px solid #e1e5e9',
                borderRadius: '10px',
                fontSize: '16px',
                backgroundColor: 'white',
                cursor: 'pointer'
              }}
            >
              <option value="EASY">🟢 Easy - Beginner Level</option>
              <option value="MEDIUM">🟡 Medium - Intermediate Level</option>
              <option value="HARD">🔴 Hard - Advanced Level</option>
            </select>
          </div>
          
          <button 
            onClick={handleGenerate} 
            disabled={!subject.trim()}
            style={{ 
              background: subject.trim() ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#ccc',
              color: 'white', 
              padding: '15px 30px', 
              border: 'none', 
              borderRadius: '50px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: subject.trim() ? 'pointer' : 'not-allowed',
              transition: 'all 0.3s',
              boxShadow: subject.trim() ? '0 4px 15px rgba(102, 126, 234, 0.4)' : 'none',
              transform: 'scale(1)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              margin: '0 auto'
            }}
            onMouseOver={(e) => {
              if (subject.trim()) {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)';
              }
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = subject.trim() ? '0 4px 15px rgba(102, 126, 234, 0.4)' : 'none';
            }}
          >
            🚀 Generate Amazing Quiz
          </button>
        </div>

        {generatedQuiz && (
          <div style={{ 
            background: 'white', 
            padding: '30px', 
            borderRadius: '20px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            border: '1px solid #e1e5e9',
            animation: 'slideIn 0.5s ease-out'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '25px' }}>
              <h3 style={{ 
                color: '#333', 
                fontSize: '1.8rem',
                marginBottom: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px'
              }}>🎉 {generatedQuiz.title}</h3>
              
              <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '20px' }}>
                <span style={{ 
                  background: '#e3f2fd', 
                  color: '#1976d2', 
                  padding: '5px 12px', 
                  borderRadius: '20px',
                  fontSize: '14px',
                  fontWeight: '600'
                }}>📚 {generatedQuiz.subject}</span>
                
                <span style={{ 
                  background: generatedQuiz.difficulty === 'EASY' ? '#e8f5e8' : 
                           generatedQuiz.difficulty === 'MEDIUM' ? '#fff3cd' : '#f8d7da',
                  color: generatedQuiz.difficulty === 'EASY' ? '#2e7d32' : 
                         generatedQuiz.difficulty === 'MEDIUM' ? '#856404' : '#721c24',
                  padding: '5px 12px', 
                  borderRadius: '20px',
                  fontSize: '14px',
                  fontWeight: '600'
                }}>⚡ {generatedQuiz.difficulty}</span>
              </div>
            </div>
            
            {generatedQuiz.questions && generatedQuiz.questions.map((q, index) => (
              <div key={index} style={{ 
                background: 'linear-gradient(135deg, #f8f9ff 0%, #f1f3ff 100%)', 
                padding: '25px', 
                margin: '20px 0', 
                borderRadius: '15px',
                border: '1px solid #e1e5e9',
                boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
              }}>
                <p style={{ 
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: '#333',
                  marginBottom: '15px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px'
                }}>
                  <span style={{ 
                    background: '#667eea', 
                    color: 'white', 
                    borderRadius: '50%', 
                    width: '25px', 
                    height: '25px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: '700',
                    minWidth: '25px'
                  }}>{index + 1}</span>
                  {q.question}
                </p>
                
                {q.options && (
                  <div style={{ paddingLeft: '35px' }}>
                    {q.options.map((option, i) => (
                      <div key={i} style={{ 
                        background: 'white',
                        padding: '12px 16px',
                        margin: '8px 0',
                        borderRadius: '10px',
                        border: '1px solid #e1e5e9',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        transition: 'all 0.2s',
                        cursor: 'pointer'
                      }}>
                        <span style={{
                          background: '#f0f0f0',
                          color: '#666',
                          borderRadius: '50%',
                          width: '20px',
                          height: '20px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '12px',
                          fontWeight: '600',
                          minWidth: '20px'
                        }}>{String.fromCharCode(65 + i)}</span>
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            <div style={{ 
              textAlign: 'center', 
              marginTop: '30px',
              padding: '20px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '15px',
              color: 'white'
            }}>
              <p style={{ 
                margin: '0', 
                fontSize: '16px',
                fontWeight: '600'
              }}>🎓 Quiz generated successfully! Ready to challenge your knowledge?</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quizzes;
