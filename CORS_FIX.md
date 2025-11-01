# CORS Issue Fix - Vercel Deployment

## Problem
When your frontend is deployed on Vercel (`https://woomai.vercel.app`), it cannot connect to `localhost:5001` because:
1. The backend is running locally on your machine
2. Browsers block requests from HTTPS sites to localhost for security reasons
3. CORS errors occur when trying to access the local backend

## Solution: Deploy the Backend

You have two options:

### Option 1: Deploy Backend to Heroku/Railway/Render

1. **Deploy your Flask backend** to one of these services:
   - [Heroku](https://www.heroku.com/)
   - [Railway](https://railway.app/)
   - [Render](https://render.com/)

2. **Update environment variable in Vercel:**
   - Go to your Vercel project settings
   - Add environment variable: `REACT_APP_API_BASE_URL`
   - Set value to your deployed backend URL (e.g., `https://your-backend.herokuapp.com`)
   - Redeploy your frontend

### Option 2: Use Environment Variables for Local Development

For local development, the app will automatically use `localhost:5001`.

For production, set the `REACT_APP_API_BASE_URL` environment variable in Vercel.

## Backend CORS Settings

The backend has been updated to allow requests from:
- `http://localhost:3000` (local development)
- `https://woomai.vercel.app` (your Vercel deployment)
- Any `*.vercel.app` subdomain

## Changes Made

✅ Created `frontend/src/config/api.js` - Centralized API configuration
✅ Updated all components to use the configurable API base URL:
  - `SearchBar.js`
  - `PDFViewer.js`
  - `MindMap.js`
  - `ResearchPapers.js`
  - `LocalPDFUpload.js`
✅ Updated backend CORS to allow Vercel domain

## Next Steps

1. **Deploy your backend** to a cloud service
2. **Update the `REACT_APP_API_BASE_URL` in Vercel** with your backend URL
3. **Redeploy your frontend** on Vercel

## Quick Fix for Testing

If you want to test locally with the Vercel deployment, you can:
1. Use a tunneling service like [ngrok](https://ngrok.com/) to expose your localhost
2. Set `REACT_APP_API_BASE_URL` in Vercel to your ngrok URL

However, **deploying the backend is the proper solution** for production.

