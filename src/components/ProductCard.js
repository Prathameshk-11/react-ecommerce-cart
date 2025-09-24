import React, { useContext, useState } from "react";
import { CartContext } from "../App";

export default function ProductCard({ product }) {
  const { cart, dispatch } = useContext(CartContext);
  const [feedback, setFeedback] = useState("");

  function handleAdd() {
    const existing = cart[product.id];
    if (existing && existing.qty >= 10) {
      setFeedback("You already have the maximum (10) of this product in cart.");
      setTimeout(() => setFeedback(""), 2200);
      return;
    }
    dispatch({ type: "ADD", payload: product });
    setFeedback("Added to cart");
    setTimeout(() => setFeedback(""), 1200);
  }

  return (
    <article className="card">
      <img src={product.image} alt={product.name} />
      <div className="card-body">
        <h3>{product.name}</h3>
        <p className="desc">{product.description}</p>
        <div className="row">
          <strong>₹{product.price}</strong>
          <button className="btn" onClick={handleAdd}>Add to Cart</button>
        </div>
        {feedback && <div className="feedback">{feedback}</div>}
      </div>
    </article>
  );
}
