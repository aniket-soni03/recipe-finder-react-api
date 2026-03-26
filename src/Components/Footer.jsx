// src/Components/Footer.jsx
import React, { useEffect } from "react";
import "./styles/Footer.css";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const Footer = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  // Smooth scroll to section if on homepage
  const handleNavigate = (sectionId, path = "/") => {
    if (window.location.pathname !== path) {
      navigate(path);
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 400);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="footer-section">
      <div className="footer-container">
        {/* 🧭 Brand Info */}
        <div className="footer-brand" data-aos="fade-right">
          <h2 className="footer-logo">🍴 FoodieHub</h2>
          <p className="footer-desc">
            Explore endless recipes, discover new cuisines, and cook like a pro
            — all in one place.
          </p>
        </div>

        {/* 🔗 Quick Links */}
        <div className="footer-links" data-aos="fade-up">
          <h3>Quick Links</h3>
          <ul>
            <li onClick={() => handleNavigate("hero")}>Home</li>
            <li onClick={() => handleNavigate("about")}>About Us</li>
            <li onClick={() => handleNavigate("blog")}>Blog</li>
            <li onClick={() => handleNavigate("contact")}>Contact</li>
          </ul>
        </div>

        {/* 📞 Contact Info */}
        <div className="footer-contact" data-aos="fade-left">
          <h3>Contact Info</h3>
          <p>Email: support@foodiehub.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>Location: Hyderabad, India</p>
        </div>
      </div>

      {/* 🌅 Bottom Bar */}
      <div className="footer-bottom" data-aos="zoom-in">
        <p>© 2025 FoodieHub. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
