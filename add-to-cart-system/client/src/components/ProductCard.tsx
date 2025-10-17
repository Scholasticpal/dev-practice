import React from "react";
import { Product } from "../types";
import QuantitySelector from "./QuantitySelector";

interface ProductCardProps {
  product: Product;
  quantityInCart: number;
  onUpdateCart: (productId: string, quantity: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  quantityInCart,
  onUpdateCart,
}) => {
  return (
    <div className="product-card">
      <img src={product.image_url} alt={product.name} />
      <div className="product-card-details">
        <div>
          <h3>{product.name}</h3>
          <p>Rs. {product.price.toFixed(2)}</p>
        </div>
        <QuantitySelector
          quantity={quantityInCart}
          onIncrement={() => onUpdateCart(product.product_id, 1)}
          onDecrement={() => onUpdateCart(product.product_id, -1)}
        />
      </div>
    </div>
  );
};

export default ProductCard;
