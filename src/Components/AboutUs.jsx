import React from "react";
import "./styles/AboutUsCss.css";
import aboutImg from "../assets/icons/about-chef.png"; // chef/food image 

const AboutUs = () => {
  return (
    <section className="aboutus-section" id="about">
      <div className="aboutus-container" data-aos="fade-up">
        <div className="aboutus-left">
          <img src={aboutImg} alt="Chef" className="aboutus-img" />
        </div>

        <div className="aboutus-right">
          <h2 className="aboutus-title">About <span>Us</span></h2>
          <p className="aboutus-text">
            Welcome to <strong>FoodieHub</strong> — your smart recipe finder that blends
            technology and taste! 🍲 We help food lovers explore thousands of
            recipes from across the world — whether it’s spicy Indian curries,
            creamy Italian pastas, or sizzling Chinese noodles.
          </p>

          <p className="aboutus-text">
            Our platform brings you not only delicious ideas but also detailed
            nutrition facts for every recipe. Plan smarter, eat healthier, and
            discover global cuisines — all in one place!
          </p>

          <div className="aboutus-stats">
            <div className="stat-box">
              <h3>1000+</h3>
              <p>Recipes</p>
            </div>
            <div className="stat-box">
              <h3>250+</h3>
              <p>Ingredients</p>
            </div>
            <div className="stat-box">
              <h3>50+</h3>
              <p>Cuisines</p>
            </div>
          </div>

          <button className="aboutus-btn">Explore Recipes</button>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
