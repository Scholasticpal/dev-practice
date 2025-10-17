import React, { useState, useEffect, JSX } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Product, Cart } from "./types";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import "./App.css";

const API_URL = "http://localhost:4000";
const USER_ID = "user-123";

function App(): JSX.Element {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Cart | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/api/products`)
      .then((res) => res.json())
      .then(setProducts);
    fetch(`${API_URL}/api/cart/${USER_ID}`)
      .then((res) => res.json())
      .then(setCart);
  }, []);

  const handleUpdateCart = async (productId: string, quantity: number) => {
    const response = await fetch(`${API_URL}/api/cart/${USER_ID}/items`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, quantity }),
    });
    const responseData = await response.json();
    if (response.ok) {
      setCart(responseData as Cart);
    } else {
      alert(responseData.message);
    }
  };

  const handleCheckout = () => {
    alert("Order placed successfully!");
  };

  const cartCount =
    cart?.items.reduce((count, item) => count + item.quantity, 0) ?? 0;

  return (
    <Router>
      <Navbar cartCount={cartCount} />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              products={products}
              cart={cart}
              onUpdateCart={handleUpdateCart}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <CartPage
              cart={cart}
              onUpdateCart={handleUpdateCart}
              onCheckout={handleCheckout}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
