import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="global-footer">
      {/* 🟢 THE OVAL CURVE TOP CAP */}
      <div className="footer-oval-curve"></div>

      <div className="footer-content-wrapper">
        <div className="footer-main-grid">
          
          {/* Column 1: Brand & Identity */}
          <div className="footer-column brand-info">
            <h2 className="footer-logo">Elite Residence</h2>
            <p className="footer-tagline">
              Redefining modern coastal living with architectural beauty, smart utilities, and top-tier security systems.
            </p>
          </div>
          
          <div className="footer-column">
            <h3>Explore</h3>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/for-rent">Properties For Rent</Link></li>
              <li><Link to="/for-sale">Properties For Sale</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact Summary */}
          <div className="footer-column">
            <h3>Headquarters</h3>
            <p className="footer-contact-text">📍 1st Floor, Nyali Centre, Mombasa</p>
            <p className="footer-contact-text">📞 +254 757 972 820</p>
            <p className="footer-contact-text">✉️ antonysikuku02@gmail.com</p>
          </div>

        </div>

        {/* Bottom Rights Bar */}
        <div className="footer-copyright-bar">
          <p>&copy; {new Date().getFullYear()} Elite Residence. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;