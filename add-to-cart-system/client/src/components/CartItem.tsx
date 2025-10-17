import React from "react";
import { CartItem as CartItemType } from "../types";
import QuantitySelector from "./QuantitySelector";

interface CartItemProps {
  item: CartItemType;
  onUpdateCart: (productId: string, quantity: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onUpdateCart }) => {
  return (
    <div className="cart-item">
      <img src={item.image_url} alt={item.name} />
      <div className="cart-item-details">
        <h3>{item.name}</h3>
        <p>Rs. {item.price.toFixed(2)}</p>
      </div>
      <QuantitySelector
        quantity={item.quantity}
        onIncrement={() => onUpdateCart(item.product_id, 1)}
        onDecrement={() => onUpdateCart(item.product_id, -1)}
      />
    </div>
  );
};

export default CartItem;
