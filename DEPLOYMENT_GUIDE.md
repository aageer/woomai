# Backend Deployment Guide

This guide will help you deploy your Flask backend to the cloud so your Vercel frontend can access it.

## Quick Comparison

| Service | Free Tier | Ease of Setup | Best For |
|---------|-----------|---------------|----------|
| **Railway** | ✅ Yes | ⭐⭐⭐ Very Easy | Quick deployment |
| **Render** | ✅ Yes | ⭐⭐ Easy | Free tier hosting |
| **Heroku** | ❌ No | ⭐ Medium | Paid plans only |

**Recommendation: Use Railway for easiest setup**

---

## Option 1: Deploy to Railway (Recommended)

### Step 1: Prepare Your Repository

1. Make sure all your code is committed:
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

### Step 2: Deploy on Railway

1. **Sign up/Login:**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub (easiest)

2. **Create New Project:**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your `woomai` repository
   - Select the repository

3. **Configure Service:**
   - Railway will auto-detect it's a Python project
   - Set the **Root Directory** to `PromptEngineering`
   - Railway will automatically:
     - Detect `requirements.txt`
     - Install dependencies
     - Run using `Procfile`

4. **Set Environment Variables:**
   - Go to your service → Variables
   - Add these variables (you'll need to get them from `API_KEY.py`):
     - `PORT` (automatically set by Railway)
     - Any API keys your app needs (check `API_KEY.py`)

5. **Get Your Backend URL:**
   - Once deployed, Railway gives you a URL like: `https://your-app-name.up.railway.app`
   - Copy this URL

### Step 3: Update Vercel Environment Variable

1. Go to [vercel.com](https://vercel.com) → Your Project → Settings → Environment Variables
2. Add new variable:
   - **Key**: `REACT_APP_API_BASE_URL`
   - **Value**: `https://your-app-name.up.railway.app` (your Railway URL)
   - **Environment**: Production, Preview, Development
3. **Redeploy** your frontend

---

## Option 2: Deploy to Render

### Step 1: Prepare Repository
Same as Railway - commit and push your code.

### Step 2: Deploy on Render

1. **Sign up:**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **Create Web Service:**
   - Click "New" → "Web Service"
   - Connect your GitHub repo
   - Select your repository

3. **Configure:**
   - **Name**: `woomai-backend` (or any name)
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `PromptEngineering`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`

4. **Set Environment Variables:**
   - Scroll to "Environment Variables"
   - Add your API keys (from `API_KEY.py`)
   - `PORT` is automatically set

5. **Deploy:**
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - Get your URL: `https://your-app-name.onrender.com`

### Step 3: Update Vercel
Same as Railway - add `REACT_APP_API_BASE_URL` with your Render URL.

---

## Important Notes

### Environment Variables to Set

Check your `API_KEY.py` file for what API keys you need. Common ones:
- Google Gemini API Key
- ElevenLabs API Key
- Google Cloud Speech API credentials (if using)

**Never commit API_KEY.py to git!** Set them as environment variables in your deployment platform.

### Testing Your Deployment

1. Visit your backend URL (e.g., `https://your-app.up.railway.app/health`)
2. You should see a JSON response with status
3. If it works, update Vercel and test your frontend

### Common Issues

**Issue**: Backend returns 500 errors
- **Fix**: Check logs in Railway/Render dashboard
- Make sure all environment variables are set correctly

**Issue**: CORS errors persist
- **Fix**: Verify your backend URL in Vercel's `REACT_APP_API_BASE_URL` matches exactly
- Check backend CORS settings allow `*.vercel.app`

**Issue**: Backend times out
- **Fix**: Render free tier spins down after 15 min of inactivity
- Railway free tier is more stable

---

## Next Steps After Deployment

1. ✅ Backend deployed and accessible
2. ✅ Vercel environment variable set
3. ✅ Frontend redeployed
4. 🎉 Test your app on Vercel!

Your app should now work end-to-end! 🚀

