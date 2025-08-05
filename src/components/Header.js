import React from "react";
import { Link } from "react-router-dom";
import "../styles/header.css";
import logo from "../assets/logo.png";
import "../styles/globals.light.css";
import "../styles/globals.dark.css";
import { useEffect, useState } from "react";
import LoginButton from "./authModal";


function Header() {
    return (
    <header className="app-header">
      <div className="header-left">
      <Link to="./">
          <img src={logo} alt="Logo" className="logo-header" />
        </Link> 
      </div>
      <div className="header-center">
        <DarkModeToggle />
      </div>
      <div className="header-right pr-4">
        <div className="hover:bg-gray-300 dark:hover:bg-gray-700 text-center w-20 rounded p-1">
          <LoginButton />
        </div>
      </div>
    </header>
    );
  }

function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(true);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
      if (darkMode) {
          document.documentElement.classList.add("dark");
      } else {
          document.documentElement.classList.remove("dark");
      }
  }, [darkMode]);

  const getButtonText = () => {
    if (hovered) {
      return darkMode ? "Switch to Light" : "Switch to Dark";
    }
    return darkMode ? "Dark Mode" : "Light Mode";
  };

return (
  <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setDarkMode(!darkMode)}
      className="toggle-mode"
      >
      {getButtonText()}
  </button>
);
}

export default Header;