"use client";

import Navbar from "@/components/Navbar";
import { useCart } from "@/lib/CartProvider";
import { useSession } from "next-auth/react";
import {  useRouter } from "next/navigation";


export default function CartPage() {
  const router = useRouter()
  const { cart, removeFromCart } = useCart();

  const {data: session,status} = useSession();
  
  const total = cart.reduce(
    (acc: any, item: any) => acc + item.price * (item.quantity || 1),
    0
  );

  if (cart.length === 0)
    return (
      <div>
        <Navbar />
        <p className="p-8 text-center text-gray-500">Your cart is empty.</p>;
      </div>
    );
  

  const handleCheckout = ()=>{
    if(status === 'authenticated' || session){
      router.push('/cart/checkout')
    }else{
      router.push('/login?redirect=/cart/ss')
    }
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-6">Your Cart</h1>

        {cart.map((item: any) => (
          <div
            key={item.id + item.sizes}
            className="flex items-center justify-between border-b py-4"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-600">Size: {item.sizes}</p>
                <p className="text-sm text-gray-600">
                  $ {item.price} × {item.quantity}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-600 cursor-pointer text-sm"
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        <div className="mt-6 flex justify-between text-lg font-semibold">
          <span>Total:</span>
          <span>$ {total}</span>
        </div>
        {/* <Link href={'/cart/checkout'}> */}
          <button onClick={handleCheckout} className="mt-6 w-full cursor-pointer bg-white text-black py-3 rounded-md">
            Checkout
          </button>

        {/* </Link> */}
        
      </div>
    </div>
  );
}
