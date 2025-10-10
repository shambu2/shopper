"use client"
import { useContext, createContext, useState } from "react";

type cartItem = {
  id: string;
  name: string;
  intro: string;
  size: string;
  price: number;
  image: string;
  quantity?: number;
//   gender: string;
//   category: string;
};

type cartContextType = {
  cartItems: cartItem[];
  addToCart: (item: cartItem) => void;
  removeFromCart: (item: cartItem) => void;
};

const CartContext = createContext<cartContextType | null>(null);

export const cartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<cartItem[]>([]);
  const addToCart = (item: cartItem) => {
    setCart((prev) => {
      const existingItem = prev.find((i) => i.id === item.id);
      if (existingItem) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: (i.quantity || 1) + 1 } : i
        );
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (item: cartItem) => {
    setCart((prev) => prev.filter((i) => i.id !== item.id));
  };

  return (
    
    <CartContext.Provider value={{ cartItems:cart, addToCart, removeFromCart }}>
      {children}      
    </CartContext.Provider>
  )

};

export const useCart = ()=>{
    const context = useContext(CartContext);
    if (!context) {
      throw new Error("useCart must be used within a cartProvider");
    }
    return context;
}