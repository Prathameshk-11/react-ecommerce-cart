import React, { useReducer, useEffect } from "react";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import products from "./data/products";


const initialState = { items: {} };


function cartReducer(state, action) {
  const items = { ...state.items };
  switch (action.type) {
    case "SET":
      return { items: action.payload || {} };
    case "ADD": {
      const id = action.payload.id;
      if (!items[id]) items[id] = { product: action.payload, qty: 1 };
      else items[id].qty = Math.min(10, items[id].qty + 1);
      return { items };
    }
    case "INCREMENT": {
      const id = action.payload;
      if (!items[id]) return state;
      items[id].qty = Math.min(10, items[id].qty + 1);
      return { items };
    }
    case "DECREMENT": {
      const id = action.payload;
      if (!items[id]) return state;
      items[id].qty = Math.max(1, items[id].qty - 1);
      return { items };
    }
    case "REMOVE": {
      const id = action.payload;
      delete items[id];
      return { items };
    }
    default:
      return state;
  }
}

export const CartContext = React.createContext();

export default function App() {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  
  useEffect(() => {
    const raw = localStorage.getItem("cart");
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        dispatch({ type: "SET", payload: parsed });
      } catch (e) {
        console.warn("Failed reading cart from localStorage", e);
      }
    }
  }, []);

  
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.items));
  }, [state.items]);

  return (
    <CartContext.Provider value={{ cart: state.items, dispatch }}>
      <div className="container">
        <header>
          <h1>React E-commerce Product Cart</h1>
        </header>
        <main>
          <ProductList products={products} />
          <Cart />
        </main>
        
      </div>
    </CartContext.Provider>
  );
}
