// This file defines the shape of our data across the app.

export interface Product {
  product_id: string;
  name: string;
  price: number;
  image_url: string;
  stock_quantity: number;
}

export interface CartItem extends Omit<Product, "stock_quantity"> {
  quantity: number;
}

export interface Cart {
  cart_id: string;
  user_id: string;
  items: CartItem[];
  total_price: number;
}
