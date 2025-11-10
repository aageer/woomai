// API Configuration
// This allows the app to work both locally and when deployed
// Set REACT_APP_API_BASE_URL in your environment variables

const getApiBaseUrl = () => {
  // Priority 1: Environment variable (for production)
  if (process.env.REACT_APP_API_BASE_URL) {
    return process.env.REACT_APP_API_BASE_URL;
  }
  
  // Priority 2: Localhost for local development
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:5001';
  }
  
  // Priority 3: Fallback - show error if deployed without env var
  console.error(
    '⚠️ REACT_APP_API_BASE_URL not set! ' +
    'Please set this environment variable in Vercel with your Render backend URL.'
  );
  return null; // Will cause fetch to fail with clear error
};

const API_BASE_URL = getApiBaseUrl();

export default API_BASE_URL;

