// CartPage.jsx
import React from "react";
import { useCart } from "./CartContext";
import { Link } from "react-router-dom";
import "./styles/CartPage.css";

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();

  const total = cartItems.reduce((s, it) => s + (it.qty || 1), 0);

  return (
    <div className="cart-wrap">
      <div className="inner">
        <Link to="/" className="back-link">← Back to search</Link>
        <h2>Your Cart</h2>
        {cartItems.length === 0 && <p>Your cart is empty.</p>}
        {cartItems.map((it) => (
          <div key={it.id} className="cart-item">
            <img src={it.image} alt={it.title} />
            <div className="ci-body">
              <h4>{it.title}</h4>
              <p>Qty: {it.qty}</p>
              <div className="ci-actions">
                <button onClick={() => removeFromCart(it.id)}>Remove</button>
              </div>
            </div>
          </div>
        ))}

        {cartItems.length > 0 && (
          <div className="cart-footer">
            <button onClick={clearCart} className="clear-btn">Clear Cart</button>
            <div className="cart-summary">Items: {total}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
