import React from "react";
import { Product, Cart } from "../types";
import ProductList from "../components/ProductList";

interface HomePageProps {
  products: Product[];
  cart: Cart | null;
  onUpdateCart: (productId: string, quantity: number) => void;
}

const HomePage: React.FC<HomePageProps> = ({
  products,
  cart,
  onUpdateCart,
}) => {
  return (
    <main>
      <ProductList
        products={products}
        cart={cart}
        onUpdateCart={onUpdateCart}
      />
    </main>
  );
};

export default HomePage;
