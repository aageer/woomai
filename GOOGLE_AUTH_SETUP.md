# Google Sign-In Setup Guide

This application now supports Google Sign-In authentication. Follow these steps to complete the setup:

## Prerequisites
- A Google Cloud account
- Access to Google Cloud Console

## Setup Steps

### 1. Create a Google OAuth 2.0 Client ID

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to **APIs & Services** > **Credentials**
4. Click **Create Credentials** > **OAuth client ID**
5. Choose **Web application** as the application type
6. Add authorized JavaScript origins:
   - `http://localhost:3000`
   - `http://localhost:5001`
7. Add authorized redirect URIs:
   - `http://localhost:3000`
8. Click **Create** and copy your **Client ID**

### 2. Configure the Frontend

Create a `.env` file in the `frontend` directory:

```bash
cd frontend
touch .env
```

Add your Google Client ID to the `.env` file:

```env
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id_here
```

**Important:** Replace `your_google_client_id_here` with the actual Client ID you obtained from Google Cloud Console.

### 3. Restart the Development Server

After adding the `.env` file, restart the frontend development server:

```bash
# Stop the current servers (Ctrl+C)
# Then restart:
./start_dev.sh
```

### 4. How It Works

- **Sign In**: Click the "Sign In" button in the header to authenticate with Google
- **User Profile**: Once signed in, you'll see your profile picture and name
- **Sign Out**: Click the logout button to sign out

### 5. Features

✅ Google OAuth 2.0 authentication  
✅ User profile display  
✅ Secure token-based authentication  
✅ Responsive design  
✅ Sign in/Sign out functionality  

### 6. Security Notes

- Never commit your `.env` file to version control
- The `.env` file is already in `.gitignore`
- Keep your Google Client ID secure and private

## Troubleshooting

### "Invalid Client ID" Error
- Make sure you copied the correct Client ID from Google Cloud Console
- Check that `REACT_APP_GOOGLE_CLIENT_ID` is set correctly in `.env`
- Restart the development server after modifying `.env`

### "Redirect URI Mismatch" Error
- Go to Google Cloud Console > Credentials
- Edit your OAuth client
- Ensure `http://localhost:3000` is in the authorized redirect URIs

### Sign In Button Not Appearing
- Check browser console for errors
- Verify that `@react-oauth/google` package is installed
- Make sure `.env` file exists and contains the correct client ID

## Next Steps (Optional)

You can extend this authentication to:
- Protect routes based on authentication state
- Store user sessions in localStorage or cookies
- Integrate with backend API for user management
- Add role-based access control

## References

- [@react-oauth/google Documentation](https://www.npmjs.com/package/@react-oauth/google)
- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)

