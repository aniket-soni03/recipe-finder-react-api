import React, { useEffect, useState, useRef } from "react";
import FoodCards from "./FoodCards";
import CardAnimation from "./CardAnimation";
import { useSearch } from "./SearchContext";
import "./styles/FoodSearchCss.css";
import FoodMenu from "./FoodMenu";
import Aos from "aos";
import "aos/dist/aos.css";

const API_KEY = "8ef078be40b7421fba9355bef04a32c1";

const FoodSearch = () => {
  const { recipes, setRecipes, searchQuery, setSearchQuery } = useSearch();
  const [localInput, setLocalInput] = useState(searchQuery || "");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  const cuisines = ["Indian", "Italian", "Mexican", "Chinese", "American", "Thai", "French"];
  const ingredients = ["chicken", "tomato", "onion", "garlic", "cheese", "egg", "pasta", "rice", "potato", "fish"];

  // Initialize AOS
  useEffect(() => {
    Aos.init({
      duration: 800,
      offset: 100,
      easing: "ease-in-out",
      once: false,
    });
  }, []);

  // Refresh AOS when recipes change
  useEffect(() => {
    Aos.refresh();
  }, [recipes]);

  // Show default recipes when first loaded
  useEffect(() => {
    if (!searchQuery && recipes.length === 0) {
      handleSearch("paneer"); // default search
    }
  }, []); // only on mount

  // Live suggestions
  useEffect(() => {
    const run = async () => {
      if (localInput.trim().length < 2) {
        setSuggestions([]);
        return;
      }
      try {
        const res = await fetch(
          `https://api.spoonacular.com/recipes/autocomplete?query=${encodeURIComponent(
            localInput
          )}&number=8&apiKey=${API_KEY}`
        );
        const data = await res.json();
        const apiTitles = Array.isArray(data) ? data.map((d) => d.title) : [];
        const local = [...cuisines, ...ingredients].filter((x) =>
          x.toLowerCase().includes(localInput.toLowerCase())
        );
        const unique = [...new Set([...apiTitles, ...local])].slice(0, 6);
        setSuggestions(unique);
      } catch {
        setSuggestions([]);
      }
    };
    const t = setTimeout(run, 300);
    return () => clearTimeout(t);
  }, [localInput]);

  // Close suggestions on outside click
  useEffect(() => {
    const onDoc = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target))
        setSuggestions([]);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  // Fetch helpers
  const fetchVideos = async (q) => {
    try {
      const res = await fetch(
        `https://api.spoonacular.com/food/videos/search?query=${encodeURIComponent(
          q
        )}&number=12&apiKey=${API_KEY}`
      );
      const data = await res.json();
      return Array.isArray(data.videos) ? data.videos : [];
    } catch {
      return [];
    }
  };

  const fetchRecipes = async (q) => {
    try {
      const res = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?query=${encodeURIComponent(
          q
        )}&number=12&addRecipeInformation=true&fillIngredients=true&apiKey=${API_KEY}`
      );
      const data = await res.json();
      return data.results || [];
    } catch {
      return [];
    }
  };

  const mergeRecipesWithVideos = (recipesList, videosList) => {
    if (!videosList || videosList.length === 0)
      return recipesList.map((r) => ({ ...r, video: null }));
    const lowerVideos = videosList.map((v) => ({
      ...v,
      short: (v.shortTitle || v.title || "").toLowerCase(),
    }));
    return recipesList.map((r) => {
      const title = (r.title || "").toLowerCase();
      const match = lowerVideos.find(
        (v) =>
          title.includes(v.short) ||
          v.short.includes(title) ||
          v.title?.toLowerCase().includes(title.split(" ")[0])
      );
      return { ...r, video: match || null };
    });
  };

  // Perform search
  const handleSearch = async (customQuery) => {
    const q = (customQuery ?? localInput).trim();
    if (!q) return;
    setSearchQuery(q);
    setLoading(true);
    setRecipes([]);
    try {
      const [recipesRes, videosRes] = await Promise.all([
        fetchRecipes(q),
        fetchVideos(q),
      ]);
      const merged = mergeRecipesWithVideos(recipesRes, videosRes);
      setRecipes(merged);
    } catch (err) {
      console.error(err);
      setRecipes([]);
    } finally {
      setLoading(false);
      setSuggestions([]);
    }
  };

  const onSuggestionClick = (s) => {
    setLocalInput(s);
    handleSearch(s);
  };

  useEffect(() => {
    setLocalInput(searchQuery || "");
    setSuggestions([]);
  }, [searchQuery]);

  return (
    <>
      <div data-aos="fade-up">
        <FoodMenu onCategorySelect={(category) => handleSearch(category)} />
      </div>

      <div className="foodsearch-wrap" data-aos="fade-up" id="search">
        <CardAnimation />

        {/* 🔹 Search Section */}
        <div className="search-inner" data-aos="zoom-in">
          <h2 className="search-title" data-aos="fade-down">
            🍳 Smart Recipe Finder
          </h2>

          <div className="input-wrap" ref={inputRef}>
            <div className="search-row" data-aos="fade-up">
              <input
                id="search-input"
                value={localInput}
                onChange={(e) => setLocalInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Search by ingredient, cuisine or keyword..."
              />
              <button id="search-btn" onClick={() => handleSearch()}>
                Search
              </button>
            </div>

            {suggestions.length > 0 && (
              <ul className="suggestions-list" data-aos="fade-up">
                {suggestions.map((s, i) => (
                  <li key={i} onClick={() => onSuggestionClick(s)}>
                    {s}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* 🔹 Full-width FoodCards Section */}
        <div className="cards-container" data-aos="fade-up">
          {loading ? (
            <p className="loading-text">Loading recipes...</p>
          ) : (
            <FoodCards recipes={recipes} />
          )}
        </div>
      </div>
    </>
  );
};

export default FoodSearch;
