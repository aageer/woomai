import React, { useState, useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { BookOpen } from "lucide-react";
import "./AuthGuard.css";

const AuthGuard = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const savedUser = localStorage.getItem("google_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Error parsing saved user:", e);
      }
    }
    setIsLoading(false);
  }, []);

  // Store user info in a way that Header can access it
  useEffect(() => {
    window.authUser = user;
  }, [user]);

  // Handle sign out function
  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem("google_user");
    window.authUser = null;
  };

  // Expose handleSignOut globally
  useEffect(() => {
    window.handleSignOut = handleSignOut;
    return () => {
      window.handleSignOut = null;
    };
  }, []);

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // Get user info from Google
        const userInfoResponse = await fetch(
          `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenResponse.access_token}`
        );
        const userInfo = await userInfoResponse.json();
        const userData = {
          profile: userInfo,
          accessToken: tokenResponse.access_token,
        };
        setUser(userData);
        // Save to localStorage
        localStorage.setItem("google_user", JSON.stringify(userData));
      } catch (error) {
        console.error("Error getting user info:", error);
      }
    },
    onError: (error) => {
      console.error("Login failed:", error);
      alert("Sign in failed. Please try again.");
    },
  });

  // Show loading state
  if (isLoading) {
    return (
      <div className="auth-loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  // If user is not logged in, show the landing page
  if (!user) {
    return (
      <div className="auth-landing">
        <div className="landing-content">
          <div className="landing-logo">
            <BookOpen size={64} color="#4285f4" />
            <h1 className="landing-title">
              <span className="blue-text">Woom</span> AI
            </h1>
          </div>
          <p className="landing-subtitle">
            Your intelligent research assistant powered by AI
          </p>
          <p className="landing-description">
            Sign in to explore papers, analyze research documents, and unlock the power of AI-driven research.
          </p>
          <button className="sign-in-landing-btn" onClick={login}>
            Sign in with Google
          </button>
          <p className="landing-footer">
            Secure • Fast • Intelligent
          </p>
        </div>
      </div>
    );
  }

  // If user is logged in, show the app
  return <>{children}</>;
};

export default AuthGuard;

