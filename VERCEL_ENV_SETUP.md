# Fix: Set API URL in Vercel

## The Problem

Your frontend is trying to use `https://your-backend-url.herokuapp.com` which is a placeholder. You need to set your actual Render backend URL.

## Quick Fix (2 minutes)

### Step 1: Get Your Render Backend URL

1. Go to [render.com](https://render.com) → Your Dashboard
2. Click on your backend service (e.g., `woomai-backend`)
3. Copy the URL shown at the top (e.g., `https://woomai-backend.onrender.com`)

### Step 2: Set Environment Variable in Vercel

1. Go to [vercel.com](https://vercel.com) → Your Project (`woomai`)
2. Click **Settings** (top menu)
3. Click **Environment Variables** (left sidebar)
4. Click **"Add New"** button
5. Fill in:
   - **Key**: `REACT_APP_API_BASE_URL`
   - **Value**: `https://your-backend-name.onrender.com` (paste your Render URL here)
   - **Environments**: ✅ Production ✅ Preview ✅ Development (select all)
6. Click **"Save"**

### Step 3: Redeploy Frontend

1. Go to **Deployments** tab (top menu)
2. Find your latest deployment
3. Click **"⋯"** (three dots) on the right
4. Click **"Redeploy"**
5. Wait 1-2 minutes

### Step 4: Test

1. Visit `https://woomai.vercel.app`
2. Sign in with Google
3. Try searching for papers
4. Should work now! 🎉

---

## Example

If your Render backend URL is: `https://woomai-backend-abc123.onrender.com`

Then in Vercel, set:
- **Key**: `REACT_APP_API_BASE_URL`
- **Value**: `https://woomai-backend-abc123.onrender.com`

**Important:** No trailing slash! ✅ `https://woomai-backend.onrender.com` ❌ `https://woomai-backend.onrender.com/`

---

## Verify It's Set

After redeploying, you can verify:
1. Open browser console on your Vercel site
2. Type: `process.env.REACT_APP_API_BASE_URL`
3. Should show your Render URL (not undefined)

---

## Still Not Working?

1. **Double-check the URL** - Make sure it matches your Render URL exactly
2. **Check for typos** - No trailing slashes, correct protocol (https://)
3. **Wait for redeploy** - Can take 1-2 minutes
4. **Clear browser cache** - Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

