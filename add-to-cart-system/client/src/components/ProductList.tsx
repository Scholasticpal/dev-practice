import React from "react";
import { Product, Cart } from "../types";
import ProductCard from "./ProductCard";

interface ProductListProps {
  products: Product[];
  cart: Cart | null;
  onUpdateCart: (productId: string, quantity: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  cart,
  onUpdateCart,
}) => {
  const findQuantityInCart = (productId: string): number => {
    return (
      cart?.items.find((item) => item.product_id === productId)?.quantity ?? 0
    );
  };

  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard
          key={product.product_id}
          product={product}
          quantityInCart={findQuantityInCart(product.product_id)}
          onUpdateCart={onUpdateCart}
        />
      ))}
    </div>
  );
};

export default ProductList;
