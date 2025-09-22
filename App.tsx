// import React, { useState, useEffect, useCallback } from 'react';
// import LandingPage from './components/LandingPage';
// import ResumeBuilder from './components/ResumeBuilder';

// const App: React.FC = () => {
//   const [showBuilder, setShowBuilder] = useState(false);
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   useEffect(() => {
//     const storedTheme = localStorage.getItem('theme');
//     // Default to light theme unless 'dark' is explicitly stored.
//     const initialThemeIsDark = storedTheme === 'dark';

//     setIsDarkMode(initialThemeIsDark);
//     if (initialThemeIsDark) {
//       document.documentElement.classList.add('dark');
//     }
//   }, []);

//   const toggleTheme = useCallback(() => {
//     setIsDarkMode(prev => {
//       const newIsDark = !prev;
//       if (newIsDark) {
//         document.documentElement.classList.add('dark');
//         localStorage.setItem('theme', 'dark');
//       } else {
//         document.documentElement.classList.remove('dark');
//         localStorage.setItem('theme', 'light');
//       }
//       return newIsDark;
//     });
//   }, []);

//   const handleStartBuilding = () => {
//     setShowBuilder(true);
//     window.scrollTo(0, 0); // Ensure user starts at the top of the builder
//   };

//   const handleGoHome = () => {
//     setShowBuilder(false);
//     window.scrollTo(0, 0); // Scroll to top when returning home
//   }

//   if (showBuilder) {
//     return <ResumeBuilder onGoHome={handleGoHome} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />;
//   }

//   return <LandingPage onStartBuilding={handleStartBuilding} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />;
// };

// export default App;

import React, { useState, useEffect, useCallback } from "react";
import LandingPage from "./components/LandingPage";
import ResumeBuilder from "./components/ResumeBuilder";

const App: React.FC = () => {
  const [showBuilder, setShowBuilder] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    // Default to light theme unless 'dark' is explicitly stored.
    const initialThemeIsDark = storedTheme === "dark";

    setIsDarkMode(initialThemeIsDark);
    if (initialThemeIsDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDarkMode((prev) => {
      const newIsDark = !prev;
      if (newIsDark) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return newIsDark;
    });
  }, []);

  const handleStartBuilding = () => {
    setShowBuilder(true);
    window.scrollTo(0, 0); // Ensure user starts at the top of the builder
  };

  const handleGoHome = () => {
    setShowBuilder(false);
    window.scrollTo(0, 0); // Scroll to top when returning home
  };

  if (showBuilder) {
    return (
      <ResumeBuilder
        onGoHome={handleGoHome}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />
    );
  }

  return (
    <LandingPage
      onStartBuilding={handleStartBuilding}
      isDarkMode={isDarkMode}
      toggleTheme={toggleTheme}
    />
  );
};

export default App;
