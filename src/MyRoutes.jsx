import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Navbar from "./Components/NavBar";
import FoodSearch from "./Components/FoodSearch";
import NutritionPage from "./Components/NutritionPage";
import CartPage from "./Components/CartPage";
import ScrollToTop from "./Components/ScrollToTop";
import Hero from "./Components/Hero";
import AboutUs from "./Components/AboutUs";
import Blog from "./Components/Blog";
import ContactUs from "./Components/ContactUs";
import Footer from "./Components/Footer"; // ✅ New Footer imported

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <ScrollToTop />
        <div id="hero"><Hero /></div>     
        <div id="foodsearch"><FoodSearch /></div>
        <div id="about"><AboutUs /></div>      
        <div id="blog"><Blog /></div>             
        <div id="contact"><ContactUs /></div>    
        <Footer />                           
      </>
    ),
  },
  {
    path: "/nutrition/:id",
    element: (
      <>
        <Navbar />
        <ScrollToTop />
        <NutritionPage />
        <Footer /> {/* consistent footer on inner pages */}
      </>
    ),
  },
  {
    path: "/cart",
    element: (
      <>
        <Navbar />
        <ScrollToTop />
        <CartPage />
        <Footer />
      </>
    ),
  },
  {
    path: "/about",
    element: (
      <>
        <Navbar />
        <ScrollToTop />
        <AboutUs />
        <Footer />
      </>
    ),
  },
  {
    path: "/blog",
    element: (
      <>
        <Navbar />
        <ScrollToTop />
        <Blog />
        <Footer />
      </>
    ),
  },
  {
    path: "/contact", // ✅ standalone contact page route
    element: (
      <>
        <Navbar />
        <ScrollToTop />
        <ContactUs />
        <Footer />
      </>
    ),
  },
]);

export default router;
