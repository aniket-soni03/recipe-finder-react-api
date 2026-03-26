// src/App.jsx
import React from "react";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { CartProvider } from "./Components/CartContext";
import { SearchProvider } from "./Components/SearchContext";
import router from "./MyRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => (
  <SearchProvider>
    <CartProvider>
      <RouterProvider router={router} />
      <ToastContainer
        autoClose={2000}
        newestOnTop
        pauseOnFocusLoss={false}
        closeOnClick
        draggable
        pauseOnHover
        hideProgressBar={false}
        theme="colored"
      />
    </CartProvider>
  </SearchProvider>
);

export default App;
