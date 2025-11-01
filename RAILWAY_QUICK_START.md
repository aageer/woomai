# Railway Deployment - Quick Start Guide

## Step-by-Step Instructions

### 1. Push Your Code to GitHub
```bash
cd /Users/akhilageer/Downloads/woomai
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2. Deploy on Railway

1. **Go to Railway:** https://railway.app
2. **Sign up with GitHub** (one-click)
3. **New Project** → **Deploy from GitHub repo**
4. **Select your repository:** `aageer/woomai`
5. **Configure:**
   - Railway will auto-detect Python
   - **Root Directory:** Set to `PromptEngineering`
   - (Railway will find `requirements.txt` and `Procfile` automatically)

### 3. Set Environment Variables

Go to your service → **Variables** tab → Add these:

**Required:**
- `GEMINI_API_KEY` = Your Google Gemini API key (from `API_KEY.py` or https://makersuite.google.com/app/apikey)
- `ELEVENLABS_API_KEY` = Your ElevenLabs API key (from `API_KEY.py` or https://elevenlabs.io/app/settings/api-keys)

**How to get values:** Check your local `PromptEngineering/API_KEY.py` file for the current values, or use the links above to generate new keys.

**Optional:**
- `GOOGLE_CLOUD_CREDENTIALS_PATH` (if using Hindi speech recognition)

**Note:** Railway automatically sets `PORT` - don't add it manually.

### 4. Wait for Deployment

- Railway will automatically:
  - Install dependencies from `requirements.txt`
  - Start your app using `Procfile`
- Deployment takes 3-5 minutes
- You'll see a URL like: `https://woomai-production.up.railway.app`

### 5. Test Your Backend

Open in browser: `https://your-railway-url.up.railway.app/health`

You should see:
```json
{"status": "healthy", "pdf_loaded": false, "model_loading": false, "pdf_path": null}
```

### 6. Update Vercel

1. Go to https://vercel.com → Your Project (`woomai`)
2. **Settings** → **Environment Variables**
3. Add new variable:
   - **Key:** `REACT_APP_API_BASE_URL`
   - **Value:** `https://your-railway-url.up.railway.app` (from step 4)
   - **Environments:** Select all (Production, Preview, Development)
4. Click **Save**
5. Go to **Deployments** tab
6. Click **⋯** (three dots) on latest deployment → **Redeploy**

### 7. Test Your Frontend

1. Wait for Vercel redeploy (1-2 minutes)
2. Visit `https://woomai.vercel.app`
3. Sign in with Google
4. Try searching for papers - it should work! 🎉

---

## Troubleshooting

**Backend not starting?**
- Check Railway logs: Service → **Deployments** → Click deployment → View logs
- Make sure `Procfile` exists in `PromptEngineering/` folder

**CORS still happening?**
- Verify `REACT_APP_API_BASE_URL` in Vercel matches Railway URL exactly
- Check no trailing slash: `https://your-app.up.railway.app` (not `/` at end)

**502 Bad Gateway?**
- Backend might be starting - wait 1-2 minutes
- Check Railway logs for errors
- Verify all environment variables are set

---

## What Happens Next?

✅ Backend running on Railway  
✅ Frontend using Railway backend  
✅ No more CORS errors!  
✅ Full app working on Vercel  

Your app is now fully deployed! 🚀

