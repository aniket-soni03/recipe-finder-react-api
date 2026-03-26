// src/Components/FoodMenu.jsx
import React from "react";
import "./styles/FoodMenu.css";
import UseAos from "./UseAos"; 

import paneerIcon from "../assets/icons/paneer.png";
import chickenIcon from "../assets/icons/chicken.png";
import chineseIcon from "../assets/icons/chinese.png";
import italianIcon from "../assets/icons/italian.png";
import snacksIcon from "../assets/icons/snacks.png";
import seafoodIcon from "../assets/icons/seafood.png";
import dessertsIcon from "../assets/icons/desserts.png";
import beveragesIcon from "../assets/icons/beverages.png";
import mexicanIcon from "../assets/icons/mexican.png";

const FoodMenu = ({ onCategorySelect }) => {
    UseAos(); // Initialize AOS for scroll animations

    // Popular food categories with small image
    const categories = [
        {
            name: "Paneer",
            img: paneerIcon,
        },
        {
            name: "Chicken",
            img: chickenIcon,
        },
        {
            name: "Chinese",
            img: chineseIcon,
        },
        {
            name: "Italian",
            img: italianIcon,
        },
        {
            name: "Snacks",
            img: snacksIcon,
        },
        {
            name: "Seafood",
            img: seafoodIcon,
        },
        {
            name: "Desserts",
            img: dessertsIcon,
        },
        {
            name: "Beverages",
            img: beveragesIcon,
        },
        {
            name: "Mexican",
            img: mexicanIcon,
        },
    ];

    return (
        <div className="foodmenu-container" data-aos="fade-up" data-aos-duration="800"  id="menu" >
            <h2 className="foodmenu-title">🍽️ Explore Our Menu</h2>

            <div className="foodmenu-grid">
                {categories.map((cat, i) => (
                    <div
                        key={i}
                        className="foodmenu-item"
                        data-aos="zoom-in"
                        data-aos-delay={i * 80}
                        onClick={() => onCategorySelect(cat.name)}
                    >
                        <div className="foodmenu-img-wrap">
                            <img src={cat.img} alt={cat.name} className="foodmenu-img" />
                        </div>
                        <p className="foodmenu-name">{cat.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FoodMenu;
