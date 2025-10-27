import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AuthGuard from "./components/AuthGuard";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import ResearchPapers from "./components/ResearchPapers";
import PDFViewer from "./components/PDFViewer";
import LocalPDFUpload from "./components/LocalPDFUpload";
import LanguageSelection from "./pages/LanguageSelection";
import { LanguageProvider } from "./lang/LanguageContext";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Get your Google Client ID from https://console.cloud.google.com/
// Set it in your environment variables or replace with your actual client ID
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || "YOUR_GOOGLE_CLIENT_ID_HERE";

// Debug: Log the client ID (remove in production)
console.log("Google Client ID:", GOOGLE_CLIENT_ID);

function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <LanguageProvider>
        <BrowserRouter>
          <AuthGuard>
            <div className="app">
              <Header />
              <main className="main-content">
                <Routes>
                  <Route path="/select-language" element={<LanguageSelection />} />
                  <Route path="/" element={<HomePage />} />
                  <Route path="/research" element={<ResearchPapers />} />
                  <Route path="/pdf-viewer" element={<PDFViewer />} />
                  <Route path="/upload-pdf" element={<LocalPDFUpload />} />
                </Routes>
              </main>
            </div>
          </AuthGuard>
        </BrowserRouter>
      </LanguageProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
