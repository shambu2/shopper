// "use client";

// import { Product } from "@/lib/generated/prisma";
// import  { createContext, ReactNode, useState } from "react";

// type CartItem = Product & {
//   quantity: number;
//   sizes?: string
// }

// type CartContextType = {
//   cart: CartItem[];
//   addToCart: (item:CartItem) => void;
//   removeFromCart: (id:string) => void;
//   clearCart: () => void;
// }


// const CartContext = createContext<CartContextType | null>(null);

// export async function CartProvider({children}:{children:ReactNode}) {
//   const [cart,setCart] = useState([])
//   return(

//   )
// }