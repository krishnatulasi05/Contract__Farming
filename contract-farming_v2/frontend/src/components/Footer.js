import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-sections">
          <div className="footer-section">
            <h3>About Us</h3>
            <p>We are a company dedicated to providing the best services. Our mission is to offer top-notch solutions to our clients.</p>
          </div>
          <div className="footer-section">
            <h3>Credits</h3>
            <p>Special thanks to our team and partners for their hard work and dedication.</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/services">Services</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Affiliate</h3>
            <p>Join our affiliate program and earn commissions by promoting our services.</p>
            <a href="/affiliate">Learn More</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Cyber Sentinels. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
