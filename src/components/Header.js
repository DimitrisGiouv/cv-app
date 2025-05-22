import React from "react";
import "../styles/header.css";
import "../styles/globals.light.css";
import "../styles/globals.dark.css";
import logo from "../assets/logo.png";


import { useEffect, useState } from "react";

function Header() {
    return (
    <header className="app-header">
      <div className="header-left">
        <img src={logo} alt="Logo" className="logo-header" />
      </div>
      <div className="header-center">
        {/* Add any middle content here, e.g. navigation links or titles */}
        <span className="header-text">Welcome</span>
      </div>
      <div className="header-right">
        <DarkModeToggle />
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