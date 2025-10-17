import React from "react";
import { Link } from "react-router-dom";

interface NavbarProps {
  cartCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount }) => {
  return (
    <nav className="navbar">
      <h1>
        <Link to="/" className="nav-link">
          E-Commerce Store
        </Link>
      </h1>
      <Link to="/cart" className="nav-link">
        <div className="cart-summary">🛒 Cart: {cartCount}</div>
      </Link>
    </nav>
  );
};

export default Navbar;
