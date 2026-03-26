// src/Components/FoodCards.jsx
import React from "react";
import "./styles/FoodCardsCss.css";
import CardAnimation from "./CardAnimation";
import UseAos from "./UseAos";
import { useCart } from "./CartContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const FoodCards = ({ recipes = [] }) => {
  const { addToCart } = useCart();
  UseAos([recipes]);

  return (
    <div className="cards-wrapper">
      {recipes.length === 0 ? (
        <p className="no-results">No recipes found. Try another search!</p>
      ) : (
        <div className="cards-grid">
          {recipes.map((recipe, index) => (
            // ✅ Just added AOS attributes here — nothing else changed
            <div
              key={recipe.id || index}
              data-aos="fade-up"
              data-aos-offset="100"
              data-aos-delay={index * 100}
              data-aos-duration="800"
              data-aos-easing="ease-in-out"
            >
              <CardAnimation dataAos="zoom-in">
                <div className="recipe-card">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="recipe-img"
                    loading="lazy"
                  />
                  <h3 className="recipe-title">{recipe.title}</h3>

                  {recipe.extendedIngredients && (
                    <div className="ingredients-section">
                      <h4>Ingredients:</h4>
                      <ul>
                        {recipe.extendedIngredients
                          .slice(0, 2)
                          .map((ing, i) => (
                            <li key={i}>{ing.original}</li>
                          ))}
                      </ul>
                      <a
                        href={recipe.sourceUrl || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="see-more"
                      >
                        See more →
                      </a>
                    </div>
                  )}

                  <div className="card-actions">
                    <Link to={`/nutrition/${recipe.id}`} className="btn nutrition">
                      View Nutrition
                    </Link>

                    <div className="card-buttons">
                      <button
                        className="btn add"
                        onClick={() => addToCart(recipe)}
                      >
                        Add to Cart
                      </button>

                      {recipe.video ? (
                        <a
                          href={`https://www.youtube.com/watch?v=${recipe.video.youTubeId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn video"
                        >
                          Watch Video
                        </a>
                      ) : (
                        <button
                          className="btn video"
                          onClick={() =>
                            setTimeout(() => {
                              toast.warning(
                                "No video available for this recipe.",
                                {
                                  position: "top-center",
                                  autoClose: 1500,
                                }
                              );
                            }, 0)
                          }
                        >
                          Watch Video
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </CardAnimation>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FoodCards;
