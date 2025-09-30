// Simple API service for hackathon
const API_URL = 'http://localhost:8080';

const apiService = {

  // Simple quiz methods
  getAllQuizzes: async () => {
    const response = await fetch(`${API_URL}/api/quizzes`);
    return response.json();
  },

  generateQuiz: async (data) => {
    const response = await fetch(`${API_URL}/api/quizzes/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  },

  // Simple image enhancement
  enhanceImage: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch(`${API_URL}/api/images/enhance`, {
      method: 'POST',
      body: formData
    });
    return response.json();
  }
};

export default apiService;
