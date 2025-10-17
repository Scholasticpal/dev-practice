import React from "react";
import { Cart } from "../types";
import CartItem from "../components/CartItem";

interface CartPageProps {
  cart: Cart | null;
  onUpdateCart: (productId: string, quantity: number) => void;
  onCheckout: () => void;
}

const CartPage: React.FC<CartPageProps> = ({
  cart,
  onUpdateCart,
  onCheckout,
}) => {
  if (!cart || cart.items.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your cart is empty.</h2>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-items-list">
        <h2>Shopping Cart</h2>
        {cart.items.map((item) => (
          <CartItem
            key={item.product_id}
            item={item}
            onUpdateCart={onUpdateCart}
          />
        ))}
      </div>
      <div className="cart-checkout-summary">
        <h3>Summary</h3>
        <p>
          <span>
            Subtotal ({cart.items.reduce((acc, item) => acc + item.quantity, 0)}{" "}
            items)
          </span>
          <span>Rs. {cart.total_price.toFixed(2)}</span>
        </p>
        <button className="buy-button" onClick={onCheckout}>
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default CartPage;
