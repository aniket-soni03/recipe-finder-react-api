// src/Components/Demo.jsx
import React, { useEffect, useState, useRef } from "react";
import "./styles/Hero.css";

import food1 from "../assets/food-images/food1.jpg";
import food2 from "../assets/food-images/food2.jpg";
import food3 from "../assets/food-images/food3.jpg";
import food4 from "../assets/food-images/food4.jpg";
import food5 from "../assets/food-images/food5.jpg";
import food6 from "../assets/food-images/food6.jpg";

const images = [food1, food2, food3, food4, food5, food6];
const words = ["Ingredients", "Cuisines", "Keyword", "Name"];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const sliderRef = useRef(null);
  const intervalRef = useRef(null);
  const currentIndexRef = useRef(0);

  // typing effect
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  // Auto-slide
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(intervalRef.current);
  }, []);

  // Loop back after last image
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleTransitionEnd = (e) => {
      if (e.propertyName !== "transform") return;
      if (currentIndexRef.current >= images.length) {
        setIsTransitioning(false);
        setCurrentIndex(0);
      }
    };

    slider.addEventListener("transitionend", handleTransitionEnd);
    return () =>
      slider.removeEventListener("transitionend", handleTransitionEnd);
  }, []);

  // Restore transition after jump
  useEffect(() => {
    if (!isTransitioning) {
      const t = setTimeout(() => {
        setIsTransitioning(true);
      }, 50);
      return () => clearTimeout(t);
    }
  }, [isTransitioning]);

  // Typing logic
  useEffect(() => {
    const currentWord = words[wordIndex];
    const typingSpeed = isDeleting ? 60 : 120;
    const pauseAfterWord = 900;

    let timeout = null;

    if (!isDeleting && text === currentWord) {
      timeout = setTimeout(() => setIsDeleting(true), pauseAfterWord);
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setWordIndex((w) => (w + 1) % words.length);
    } else {
      timeout = setTimeout(() => {
        if (!isDeleting) {
          setText(currentWord.slice(0, text.length + 1));
        } else {
          setText(currentWord.slice(0, text.length - 1));
        }
      }, typingSpeed);
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex]);

  return (
    <div className="images_container">
      <div
        ref={sliderRef}
        className="slider"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: isTransitioning ? "transform 1s ease-in-out" : "none",
          width: `${(images.length + 1) * 100}%`,
        }}
      >
        {images.map((img, i) => (
          <div className="slide" key={i}>
            <img src={img} alt={`food-${i}`} className="food_image" />
          </div>
        ))}
        <div className="slide" key="clone-first">
          <img src={images[0]} alt="food-clone" className="food_image" />
        </div>
      </div>

      {/* Overlay text */}
      <div className="text_overlay">
        <h1 className="main_heading">
          <span>Let's</span> <span>Cook</span> <span>Something</span>{" "}
          <span>Delicious 😋</span>
        </h1>
        <h3 className="sub_heading">
          <span>Search</span> <span>by</span>{" "}
          <span className="typing_text">{text}</span>
          <span className="cursor">|</span>
        </h3>
      </div>

      {/* Manual navigation buttons */}
      <button className="nav_button prev" onClick={prevSlide}>
        ❮
      </button>
      <button className="nav_button next" onClick={nextSlide}>
        ❯
      </button>
    </div>
  );
};

export default Hero;
