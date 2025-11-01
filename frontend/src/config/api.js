// API Configuration
// This allows the app to work both locally and when deployed
// Set REACT_APP_API_BASE_URL in your environment variables

const API_BASE_URL = 
  process.env.REACT_APP_API_BASE_URL || 
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
    ? 'http://localhost:5001' 
    : 'https://your-backend-url.herokuapp.com'); // Update with your deployed backend URL

export default API_BASE_URL;

