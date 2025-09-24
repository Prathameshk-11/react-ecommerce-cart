import React, { useContext, useState } from "react";
import { CartContext } from "../App";

export default function CartItem({ entry }) {
  const { product, qty } = entry;
  const { dispatch } = useContext(CartContext);
  const [msg, setMsg] = useState("");

  function increment() {
    if (qty >= 10) {
      setMsg("Max quantity is 10");
      setTimeout(() => setMsg(""), 1800);
      return;
    }
    dispatch({ type: "INCREMENT", payload: product.id });
  }

  function decrement() {
    if (qty <= 1) {
      setMsg("Minimum quantity is 1");
      setTimeout(() => setMsg(""), 1800);
      return;
    }
    dispatch({ type: "DECREMENT", payload: product.id });
  }

  function removeItem() {
    const ok = window.confirm(`Remove ${product.name} from cart?`);
    if (ok) dispatch({ type: "REMOVE", payload: product.id });
  }

  return (
    <div className="cart-item">
      <img src={product.image} alt={product.name} />
      <div className="ci-body">
        <h4>{product.name}</h4>
        <p>Price: ₹{product.price}</p>
        <div className="qty-control">
          <button onClick={decrement} disabled={qty <= 1}>−</button>
          <span>{qty}</span>
          <button onClick={increment} disabled={qty >= 10}>+</button>
          <button className="btn-link remove" onClick={removeItem}>Remove</button>
        </div>
        {msg && <div className="small-msg">{msg}</div>}
      </div>
    </div>
  );
}
