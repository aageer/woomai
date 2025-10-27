import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { User, LogOut } from "lucide-react";
import "./AuthButton.css";

const AuthButton = () => {
  const [user, setUser] = useState(null);

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // Get user info from Google
        const userInfoResponse = await fetch(
          `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenResponse.access_token}`
        );
        const userInfo = await userInfoResponse.json();
        setUser({
          profile: userInfo,
          accessToken: tokenResponse.access_token,
        });
        console.log("User signed in:", userInfo);
      } catch (error) {
        console.error("Error getting user info:", error);
      }
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });

  const handleSignOut = () => {
    setUser(null);
    console.log("User signed out");
  };

  if (user) {
    return (
      <div className="auth-user-container">
        <img
          src={user.profile.picture}
          alt={user.profile.name}
          className="user-avatar"
        />
        <div className="user-info">
          <span className="user-name">{user.profile.name}</span>
        </div>
        <button
          className="sign-out-btn"
          onClick={handleSignOut}
          title="Sign Out"
        >
          <LogOut size={18} />
        </button>
      </div>
    );
  }

  return (
    <button className="sign-in-btn" onClick={login}>
      <User size={18} />
      <span>Sign In</span>
    </button>
  );
};

export default AuthButton;

