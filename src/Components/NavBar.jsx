// src/Components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "./CartContext";
import { Menu, X } from "lucide-react";
import "./styles/Navbar.css";

const Navbar = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const count = cartItems.reduce((s, i) => s + (i.qty || 1), 0);

  // ✅ same smooth scroll logic as footer
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
    setIsOpen(false); // close mobile menu after click
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="nav-container">
        {/* Left - Logo */}
        <div className="nav-logo" onClick={() => handleNavigate("hero")}>
          🍴 FoodieHub
        </div>

        {/* Center Links */}
        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
          <li onClick={() => handleNavigate("hero")}>Home</li>
          <li onClick={() => handleNavigate("menu")}>Menu</li>
          <li onClick={() => handleNavigate("search")}>Search</li>
          <li onClick={() => handleNavigate("blog")}>Blog</li>
          <li onClick={() => handleNavigate("contact")}>Contact</li>
        </ul>

        {/* Right - Cart + Hamburger */}
        <div className="nav-right">
          <Link to="/cart" className="cart-btn">
            🛒 <span className="cart-text">Cart</span>
            <span className="cart-count">{count}</span>
          </Link>

          <button
            className="menu-toggle"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
