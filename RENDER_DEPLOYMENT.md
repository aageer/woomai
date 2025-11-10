# Deploy Backend to Render.com - Step by Step

## ✅ Good News: Your Frontend is Already Configured!

Your React app already uses environment variables! The code in `frontend/src/config/api.js` is set up to use `REACT_APP_API_BASE_URL`.

---

## Step 1: Deploy Backend to Render

### 1.1 Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up with GitHub (easiest)

### 1.2 Create New Web Service
1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub account if not already connected
3. Select your repository: `aageer/woomai`

### 1.3 Configure the Service
Fill in these settings:

- **Name**: `woomai-backend` (or any name you like)
- **Region**: Choose closest to you (e.g., `Oregon (US West)`)
- **Branch**: `main`
- **Root Directory**: `PromptEngineering` ⚠️ **IMPORTANT!**
- **Runtime**: `Python 3`
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `gunicorn app:app`

### 1.4 Set Environment Variables
Scroll down to **"Environment Variables"** section and add:

- **Key**: `GEMINI_API_KEY`
  - **Value**: (Get from your `PromptEngineering/API_KEY.py` file)
  
- **Key**: `ELEVENLABS_API_KEY`
  - **Value**: (Get from your `PromptEngineering/API_KEY.py` file)

- **Key**: `PORT`
  - **Value**: (Leave empty - Render sets this automatically)

### 1.5 Deploy
1. Click **"Create Web Service"**
2. Wait 5-10 minutes for deployment
3. Render will show you a URL like: `https://woomai-backend.onrender.com`
4. **Copy this URL** - you'll need it in Step 2!

### 1.6 Test Your Backend
Open in browser: `https://your-backend-name.onrender.com/health`

You should see:
```json
{"status": "healthy", "pdf_loaded": false, "model_loading": false, "pdf_path": null}
```

---

## Step 2: Update Vercel Environment Variable

### 2.1 Go to Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Select your **frontend project** (`woomai`)

### 2.2 Add Environment Variable
1. Go to **Settings** → **Environment Variables**
2. Click **"Add New"**
3. Fill in:
   - **Key**: `REACT_APP_API_BASE_URL`
   - **Value**: `https://your-backend-name.onrender.com` (from Step 1.5)
   - **Environments**: Select all (Production, Preview, Development)
4. Click **"Save"**

### 2.3 Redeploy Frontend
1. Go to **Deployments** tab
2. Find your latest deployment
3. Click **"⋯"** (three dots) → **"Redeploy"**
4. Wait 1-2 minutes for redeploy

---

## Step 3: Test Everything

1. Visit your Vercel frontend: `https://woomai.vercel.app`
2. Sign in with Google
3. Try searching for papers
4. Everything should work! 🎉

---

## ✅ Your Code is Already Ready!

Your React app already uses the environment variable correctly:

**File**: `frontend/src/config/api.js`
```javascript
const API_BASE_URL = 
  process.env.REACT_APP_API_BASE_URL || 
  (window.location.hostname === 'localhost' 
    ? 'http://localhost:5001' 
    : 'https://your-backend-url.herokuapp.com');
```

All your components already use `API_BASE_URL` from this config, so once you:
1. ✅ Deploy backend to Render
2. ✅ Set `REACT_APP_API_BASE_URL` in Vercel
3. ✅ Redeploy frontend

Everything will work automatically!

---

## Troubleshooting

**Backend returns 500 errors?**
- Check Render logs: Dashboard → Your Service → **Logs** tab
- Verify all environment variables are set correctly

**CORS errors still happening?**
- Verify `REACT_APP_API_BASE_URL` in Vercel matches Render URL exactly
- No trailing slash: `https://woomai-backend.onrender.com` (not `/` at end)
- Check backend CORS settings allow `*.vercel.app`

**Backend times out?**
- Render free tier spins down after 15 min of inactivity
- First request after spin-down takes ~30 seconds
- Consider upgrading to paid plan for always-on service

---

## Summary

1. ✅ Deploy backend to Render (5-10 min)
2. ✅ Set `REACT_APP_API_BASE_URL` in Vercel
3. ✅ Redeploy frontend
4. 🎉 Done!

Your frontend code is already configured correctly - you just need to deploy the backend and set the environment variable!

