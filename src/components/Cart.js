import React, { useContext } from "react";
import { CartContext } from "../App";
import CartItem from "./CartItem";

export default function Cart() {
  const { cart } = useContext(CartContext);
  const entries = Object.values(cart);

  const totalQty = entries.reduce((s, e) => s + e.qty, 0);
  const totalPrice = entries.reduce((s, e) => s + e.qty * e.product.price, 0);

  return (
    <aside className="cart">
      <h2>Shopping Cart</h2>
      {entries.length === 0 ? (
        <p className="muted">Your cart is empty. Add products to begin.</p>
      ) : (
        <>
          <div className="cart-items">
            {entries.map(entry => <CartItem key={entry.product.id} entry={entry} />)}
          </div>
          <div className="cart-summary">
            <div>Total items: <strong>{totalQty}</strong></div>
            <div>Total price: <strong>₹{totalPrice}</strong></div>
            <button
              className="btn primary"
              onClick={() => alert("Demo checkout — not connected to payments.")}
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </aside>
  );
}
