import React from "react";
import ProductCard from "./ProductCard";

export default function ProductList({ products }) {
  return (
    <section className="product-list">
      <h2>Products</h2>
      <div className="grid">
        {products.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  );
}
