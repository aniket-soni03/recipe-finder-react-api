## ⚠️ Important Notice

The FoodieHub app uses the **Spoonacular API**, which has a daily free usage limit. Once this limit is reached, the API will stop responding until the next day.

If this happens, replace the API key with a new one in **two files**:

1. **src/Components/FoodSearch.jsx**

   ```js
   const API_KEY = "YOUR_NEW_KEY";
   ```

2. **src/Components/NutritionPage.jsx**

   ```js
   const API_KEY = "YOUR_NEW_KEY";
   ```

---

# 🍴 FoodieHub Frontend

FoodieHub is an **interactive and fully responsive recipe discovery web app** built with **React**. It allows users to search for dishes, view ingredients, explore nutritional info, and even watch related cooking videos. The app is smooth, modern, and beginner-friendly.

🌐 **Live Demo:** [https://food-recipe-website-frontend.vercel.app](https://food-recipe-website-frontend.vercel.app)

---

## 🚀 Tech Stack

**Frontend Framework:** React
**Routing:** React Router DOM
**State Management:** React Context API
**Styling:** Custom CSS + Flexbox + Grid
**Animations:** AOS (Animate On Scroll)
**Notifications:** React Toastify
**Data Source:** Spoonacular API
**Deployment:** Vercel (fully responsive on all devices)

---

## 🧠 Application Flow

### 1️⃣ Search Recipes

* User types an ingredient or cuisine (like "paneer" or "Italian").
* App fetches recipe suggestions in real-time.
* When user presses **Enter** or clicks **Search**, it:

  * Fetches recipe details from Spoonacular.
  * Fetches related YouTube-style food videos.
  * Merges both results for display.

### 2️⃣ View Recipes

* Displays recipe image, title, and ingredients.
* Provides options to:

  * View full recipe
  * Watch video (if available)
  * Add item to cart
  * View nutrition info

### 3️⃣ Add to Cart

* When user clicks **Add to Cart**, the recipe is added to global cart state.
* Toast messages appear for success.
* If the same item is added again, quantity increases automatically.

### 4️⃣ View Cart Page

* Shows all added recipes with images and quantity.
* User can:

  * Remove items
  * Clear entire cart
* Total count updates dynamically.

### 5️⃣ Navigation

* Navbar includes links for **Home**, **Menu**, **Search**, **Blog**, **Contact**, and **Cart**.
* Smooth scrolls between sections.
* Cart count updates in real-time.

---

## 🧩 Component Structure

```
src/
├── Components/
│   ├── Navbar.jsx             → Top navigation bar with scroll and cart count
│   ├── FoodSearch.jsx         → Handles search input, API calls, and recipe display
│   ├── FoodCards.jsx          → Displays recipes as interactive cards
│   ├── CartPage.jsx           → Displays items in the user's cart
│   ├── CartContext.jsx        → Global cart management (add/remove/clear)
│   ├── SearchContext.jsx      → Global search query and recipe state
│   ├── FoodMenu.jsx           → Category-based food filtering
│   ├── NutritionPage.jsx      → Shows nutritional breakdown of a recipe
│   ├── UseAos.js              → Custom hook to initialize and refresh animations
│   └── styles/                → All CSS files for layout and animation
│
├── routes/
│   └── MyRoutes.jsx           → Defines all routes (Home, Cart, Nutrition, etc.)
│
├── App.jsx                    → Root component, wraps all providers and routes
└── index.js                   → React entry point
```

---

## 🌈 Features

* 🍽️ Live recipe search with smart suggestions
* 🎬 Recipe video integration
* 🧾 Ingredient list and nutrition details
* 🛒 Add-to-cart with persistent quantity tracking
* 🔔 Interactive toast notifications
* ✨ Smooth animations with AOS
* 📱 Fully responsive design (mobile, tablet, desktop)
* ☁️ Deployed live on Vercel

---

## 🛠️ How to Run the App Locally

### 1. Clone the repository

```bash
git clone https://github.com/your-username/foodiehub-frontend.git
cd foodiehub-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start development server

```bash
npm start
```

### 4. Open in browser

Visit: **[http://localhost:3000](http://localhost:3000)**

---

## 💡 Notes

* Cart data is temporarily stored in React Context (memory). It resets on full page refresh.
* When backend is added, cart items and user login will persist using a database.
* Keep your API key private — do not commit it to GitHub. Use environment variables instead:

  ```bash
  REACT_APP_API_KEY=your_key_here
  ```

Then in code:

```js
const API_KEY = process.env.REACT_APP_API_KEY;
```

---

## 📘 Summary

FoodieHub demonstrates a complete **React frontend workflow** using modern concepts like:

* Component reusability
* Context-based global state
* Third-party API integration
* Real-time UI feedback
* Responsive CSS and animations

It’s a clean, scalable project that can easily be connected with a **Spring Boot backend** and **MySQL** database later for authentication and persistent cart storage.

---

**Developed with ❤️ by Aniket Soni**
