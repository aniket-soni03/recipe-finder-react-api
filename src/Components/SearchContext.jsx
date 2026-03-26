// src/Components/SearchContext.jsx
import React, { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
  // Keeps data while navigating, but resets after full refresh
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SearchContext.Provider value={{ recipes, setRecipes, searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
};
