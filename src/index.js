import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './i18n';

// Apply persisted theme before initial render so refresh keeps dark mode.
const applyInitialTheme = () => {
  try {
    const saved = localStorage.getItem('theme');
    const darkMode = saved ? JSON.parse(saved) : true;

    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch {
    document.documentElement.classList.add('dark');
  }
};

applyInitialTheme();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);