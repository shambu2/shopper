"use client"
import { Product } from "@/lib/generated/prisma";
import  { createContext, ReactNode, useContext, useState } from "react";

type CartItem =   {
  id: string;
  name: string;
  price: number;
  image: string;
  intro: string;
  quantity: number;
  sizes?: string | null
}

type CartContextType = {
  cart: CartItem[];
  addToCart: (item:CartItem) => void;
  removeFromCart: (id:string) => void;
  clearCart: () => void;
}


const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({children}:{children:ReactNode}) {
  const [cart, setCart] = useState<CartItem[]>([])

  const addToCart =(item:CartItem)=>{
    setCart(prev =>{
      const existing = prev.find(i=>i.id===item.id);
      if(existing){
        return prev.map(p =>
          p.id === item.id && p.sizes === item.sizes? {...p,quantity: p.quantity+item.quantity}:p
        );
      }
      return[...prev,item]
    })
  }
  const removeFromCart = (id:string)=>{
    setCart(prev=>prev.filter(p=>p.id!==id))
  }
  const clearCart = ()=>{
    setCart([])
  }
  return(
    <CartContext.Provider value={{cart,addToCart,removeFromCart,clearCart}}>
      {children}
    </CartContext.Provider>
  )
}
export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
};