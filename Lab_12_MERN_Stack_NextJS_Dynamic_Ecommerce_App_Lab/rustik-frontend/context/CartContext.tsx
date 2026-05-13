"use client";
import { createContext, useContext, useState, ReactNode } from "react";

// Define what a cart item looks like
type CartItem = {
  _id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

// Define what the context provides
type CartContextType = {
  cart: CartItem[];
  addToCart: (product: any) => void;
  cartTotalCount: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: any) => {
    setCart((prevCart) => {
      // Check if item is already in cart
      const existingItem = prevCart.find((item) => item._id === product._id);
      if (existingItem) {
        // Increase quantity
        return prevCart.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      // Add new item
      return [...prevCart, { ...product, quantity: 1 }];
    });
    alert(`Added ${product.name} to cart!`); // Simple feedback
  };

  const cartTotalCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, cartTotalCount }}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use the cart easily
export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}