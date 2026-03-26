// src/pages/NutritionPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./styles/NutritionPage.css";

const API_KEY = "8ef078be40b7421fba9355bef04a32c1";

const NutritionPage = () => {
  const { id } = useParams();
  const [nutri, setNutri] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.spoonacular.com/recipes/${id}/nutritionWidget.json?apiKey=${API_KEY}`
        );
        if (!res.ok) throw new Error("No nutrition data");
        const data = await res.json();
        setNutri(data);
      } catch (e) {
        console.error("Nutrition fetch error:", e);
        setNutri(null);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  return (
    <div id="nutrition-container" className="nutrition-wrap">
      <div className="nutrition-inner">
        <Link to="/" id="back-btn" className="back-link">
          ← Back to Search
        </Link>

        <h2 className="nutrition-heading">🍽️ Nutrition Details</h2>

        {loading && <p className="nutrition-loading">Loading nutrition...</p>}
        {!loading && !nutri && (
          <p className="nutrition-empty">No nutrition data available for this recipe.</p>
        )}

        {nutri && (
          <div id="nutrition-grid" className="nutri-grid">
            <div className="nutri-item">
              <h4 className="nutri-title">Calories</h4>
              <p className="nutri-value">{nutri.calories}</p>
            </div>
            <div className="nutri-item">
              <h4 className="nutri-title">Carbs</h4>
              <p className="nutri-value">{nutri.carbs}</p>
            </div>
            <div className="nutri-item">
              <h4 className="nutri-title">Fat</h4>
              <p className="nutri-value">{nutri.fat}</p>
            </div>
            <div className="nutri-item">
              <h4 className="nutri-title">Protein</h4>
              <p className="nutri-value">{nutri.protein}</p>
            </div>
            <div className="nutri-item full">
              <h4 className="nutri-title">Servings</h4>
              <p className="nutri-value">{nutri.servings || "N/A"}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NutritionPage;