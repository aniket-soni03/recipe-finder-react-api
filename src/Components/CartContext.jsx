// src/Components/CartContext.jsx
import React, { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (recipe) => {
    setCartItems((prev) => {
      const found = prev.find((p) => p.id === recipe.id);

      if (found) {
        // Toast fires 
        setTimeout(() => {
          toast.info(`${recipe.title} quantity increased!`, {
            position: "top-right",
            autoClose: 1500,
            theme: "colored",
          });
        }, 0);

        return prev.map((p) =>
          p.id === recipe.id ? { ...p, qty: (p.qty || 1) + 1 } : p
        );
      } else {
        setTimeout(() => {
          toast.success(`${recipe.title} added to cart!`, {
            position: "top-right",
            autoClose: 1500,
            theme: "colored",
          });
        }, 0);

        return [...prev, { ...recipe, qty: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((p) => p.id !== id));
    setTimeout(() => {
      toast.error("Item removed from cart", { position: "top-right", autoClose: 1500 });
    }, 0);
  };

  const clearCart = () => {
    setCartItems([]);
    setTimeout(() => {
      toast.info("Cart cleared!", { position: "top-right", autoClose: 1500 });
    }, 0);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
