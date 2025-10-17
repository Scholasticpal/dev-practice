const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// --- In-Memory db ---
const products = [
  {
    product_id: "62722f07-9f9d-4887-a612-413405d3aeaa",
    name: "Dell Laptop",
    price: 100000,
    image_url: "https://picsum.photos/id/0/500/500",
    stock_quantity: 10,
  },
  {
    product_id: "8ded87ee-696f-427f-923a-77f6a09f35a7",
    name: "Traveler's Coffee Mug",
    price: 80,
    image_url: "https://picsum.photos/id/30/500/500",
    stock_quantity: 5,
  },
  {
    product_id: "ac24d54b-ff3f-422d-98c9-984bebbcfbb6",
    name: "Apple Macbook Pro",
    price: 200000,
    image_url: "https://picsum.photos/id/48/500/500",
    stock_quantity: 8,
  },
  {
    product_id: "b42f1ced-0105-498f-ba4e-f9739546cb6f",
    name: "xbox gaming console",
    price: 19.99,
    image_url: "https://picsum.photos/id/96/500/500",
    stock_quantity: 15,
  },
];
let cart = {
  cart_id: "481b3dbc-86e9-41e2-a0d5-4e5778d33e0c",
  user_id: "2ac97278-1ee2-460e-9c07-57ca4f6a4cc2",
  items: [],
  total_price: 0,
};

// --- Helper function to recalculate cart total ---
const recalculateCart = () => {
  cart.total_price = cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
};

// --- API Endpoints ---
app.get("/api/products", (req, res) => res.json(products));
app.get("/api/cart/:userId", (req, res) => res.json(cart));

app.post("/api/cart/:userId/items", (req, res) => {
  const { productId, quantity } = req.body; // quantity can be 1 or -1

  const product = products.find((p) => p.product_id === productId);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  const existingItemIndex = cart.items.findIndex(
    (item) => item.product_id === productId
  );

  if (existingItemIndex > -1) {
    const existingItem = cart.items[existingItemIndex];

    if (
      quantity > 0 &&
      product.stock_quantity < existingItem.quantity + quantity
    ) {
      return res.status(400).json({ message: "Not enough stock!" });
    }

    existingItem.quantity += quantity;

    if (existingItem.quantity <= 0) {
      cart.items.splice(existingItemIndex, 1);
    }
  } else if (quantity > 0) {
    if (product.stock_quantity < quantity) {
      return res.status(400).json({ message: "Not enough stock!" });
    }
    const { stock_quantity, ...productDetails } = product;
    cart.items.push({ ...productDetails, quantity });
  }

  recalculateCart();
  res.json(cart);
});

const PORT = 4000;
app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
