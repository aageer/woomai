// import React from "react";
// import { Link, useLocation } from "react-router-dom";
// import { BookOpen, Search, FileText } from "lucide-react";
// import "./Header.css";

// const Header = () => {
//   const location = useLocation();
  
//   return (
//     <header className="header">
//       <div className="header-container">
//         <Link to="/" className="logo">
//           <BookOpen size={24} />
//           <span className="logo-text">
//             <span className="blue-text">Woom</span>
//           </span>
//         </Link>
        
//         <nav className="nav">
//           <Link 
//             to="/" 
//             className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
//           >
//             <Search size={18} />
//             Search
//           </Link>
//           <Link 
//             to="/research" 
//             className={`nav-link ${location.pathname === '/research' ? 'active' : ''}`}
//           >
//             <FileText size={18} />
//             Papers
//           </Link>
//         </nav>
        
      
//       </div>
//     </header>
//   );
// };

// export default Header;

// // import React from "react";
// // import "./Header.css";

// // const Header = () => (
// //   <header className="header">
// //     <div className="logo">
// //       📖 <span className="blue-text">Woom</span>
// //     </div>
// //     <div className="auth-buttons">
// //       <button className="sign-in">Sign In</button>
// //       <button className="get-started">Get Started</button>
// //     </div>
// //   </header>
// // );

// // export default Header;



import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BookOpen, Search, FileText, ArrowLeft, LogOut, User } from "lucide-react";
import "./Header.css";
import { useLanguage } from "../lang/LanguageContext";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();
  const [user, setUser] = useState(null);

  // Check for user from AuthGuard
  useEffect(() => {
    const checkUser = () => {
      if (window.authUser) {
        setUser(window.authUser);
      }
    };
    checkUser();
    // Check periodically for updates
    const interval = setInterval(checkUser, 100);
    return () => clearInterval(interval);
  }, []);

  // Keyboard shortcut: Alt + ArrowLeft → go back
  useEffect(() => {
    const onKey = (e) => {
      if (e.altKey && e.key === "ArrowLeft") {
        e.preventDefault();
        navigate(-1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  const showBack = location.pathname !== "/";

  return (
    <header className="header">
      <div className="header-container">
        {/* Back button in the navbar */}
        {showBack && (
          <button
            type="button"
            className="nav-back-btn"
            aria-label="Go back"
            onClick={() => navigate(-1)}
          >
          <ArrowLeft size={18} />
          <span>{t('app.back')}</span>
          </button>
        )}

        <Link to="/" className="logo">
          <BookOpen size={24} />
          <span className="logo-text">Woom</span>
        </Link>

        <nav className="nav">
          <Link
            to="/"
            className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
          >
            <Search size={18} />
            {t('nav.search')}
          </Link>
          <Link
            to="/research"
            className={`nav-link ${location.pathname === "/research" ? "active" : ""}`}
          >
            <FileText size={18} />
            {t('nav.papers')}
          </Link>
        </nav>

        {/* Language Toggle: segmented like nav tabs */}
        <div className="nav lang-segment">
          <button
            type="button"
            className={`nav-link ${language === 'en' ? 'active' : ''}`}
            onClick={() => setLanguage('en')}
            aria-pressed={language === 'en'}
            aria-label="Switch to English"
          >
            {t('lang.english')}
          </button>
          <button
            type="button"
            className={`nav-link ${language === 'hi' ? 'active' : ''}`}
            onClick={() => setLanguage('hi')}
            aria-pressed={language === 'hi'}
            aria-label="Switch to Hindi"
          >
            {t('lang.hindi')}
          </button>
        </div>

        {/* User Info and Sign Out */}
        {user && (
          <div className="header-user-info">
            <img
              src={user.profile.picture}
              alt={user.profile.name}
              className="header-user-avatar"
            />
            <span className="header-user-name">{user.profile.name}</span>
            <button 
              className="header-sign-out-btn" 
              onClick={() => window.handleSignOut && window.handleSignOut()}
              title="Sign Out"
            >
              <LogOut size={18} />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

