# Deploy Backend to Vercel

Yes! You can deploy your Flask backend to Vercel as serverless functions. Here's how:

## Important Considerations

⚠️ **Limitations:**
- Vercel serverless functions have a **10-second timeout** on free tier (60s on Pro, 300s on Enterprise)
- Some operations (PDF processing, AI calls) might timeout
- File storage is ephemeral (files deleted between invocations)
- ChromaDB persistent storage won't work (would need external DB)

⚠️ **Better Alternatives:**
- **Railway/Render** are better for Flask apps with file processing
- Consider if your app needs:
  - Long-running operations
  - File uploads/storage
  - Persistent database connections

## If You Still Want to Try Vercel:

### Step 1: Create API Directory Structure

The `api/` folder structure is already created:
```
woomai/
├── api/
│   └── index.py          # Serverless wrapper
├── PromptEngineering/    # Your Flask app
└── vercel.json           # Vercel config
```

### Step 2: Install Vercel CLI (Optional)

```bash
npm install -g vercel
```

### Step 3: Deploy

**Option A: Via Vercel Dashboard**
1. Go to https://vercel.com → Your Project
2. Go to **Settings** → **General**
3. Enable **Serverless Functions**
4. Set **Root Directory** to project root (not `PromptEngineering`)
5. Push code and Vercel will auto-deploy

**Option B: Via CLI**
```bash
cd /Users/akhilageer/Downloads/woomai
vercel
```

### Step 4: Set Environment Variables

In Vercel Dashboard → Settings → Environment Variables:
- `GEMINI_API_KEY`
- `ELEVENLABS_API_KEY`
- `PYTHON_VERSION` = `3.11`

### Step 5: Update Frontend API URL

In Vercel Dashboard → Your Frontend Project → Settings → Environment Variables:
- `REACT_APP_API_BASE_URL` = Your Vercel backend URL (same domain, different path)

---

## Recommended: Separate Vercel Project for Backend

Actually, **it's better to deploy backend as a separate Vercel project**:

1. **Create New Vercel Project** for backend only
2. **Connect same GitHub repo**
3. **Set Root Directory** to project root
4. **Deploy** - Vercel will detect `api/` folder

Then update frontend's `REACT_APP_API_BASE_URL` to point to backend Vercel project URL.

---

## Alternative: Fix Railway (Recommended)

Railway is actually better suited for your Flask app. The issue is just configuration:

1. **In Railway Dashboard:**
   - Settings → Root Directory: `PromptEngineering`
   - Settings → Start Command: `gunicorn app:app --bind 0.0.0.0:$PORT`

2. **Or try Render.com** - Often easier Python deployment

---

## My Recommendation

**Use Railway or Render** for backend because:
- ✅ Better for Flask/Python apps
- ✅ No timeout issues
- ✅ Better file handling
- ✅ Persistent storage
- ✅ Easier debugging

Keep Vercel for frontend only.

Would you like me to help you:
1. Fix Railway configuration (quickest)
2. Set up Render.com (very easy)
3. Or try Vercel serverless (has limitations)


