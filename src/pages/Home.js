import React from "react";
import "../styles/home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-container">
      {/* Left Panel */}
      <div className="home-left">
        <button className="Resumes-button">
          <Link to="/create" className="link">Resumes</Link>
        </button>
      </div>

      {/* Right Panel */}
      <div className="home-right">
        <h2 className="section-title">Right Side</h2>
        <p>This is the right container (2/3 of screen width).</p>
      </div>
    </div>
  );
}

export default Home;