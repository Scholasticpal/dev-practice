import React from "react";

interface QuantitySelectorProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onIncrement,
  onDecrement,
}) => {
  return (
    <div className="quantity-selector">
      <button onClick={onDecrement} disabled={quantity <= 0}>
        -
      </button>
      <span>{quantity}</span>
      <button onClick={onIncrement}>+</button>
    </div>
  );
};

export default QuantitySelector;
