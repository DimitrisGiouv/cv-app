import React from "react";
import "../styles/footer.css";

function Footer() {
  return (
    <footer className="app-footer">
      <p className="footer-text">© {new Date().getFullYear()} CV Builder. All rights reserved.</p>
    </footer>
  );
}

export default Footer;