"use client";
import { useCart } from "../context/page";

export default function CartPage() {
  const { cartItems, addToCart, removeFromCart } = useCart();

  const total = cartItems.reduce(
    (acc:any, item:any) => acc + item.price * (item.quantity || 1),
    0
  );

  if (cartItems.length === 0)
    return <p className="p-8 text-center text-gray-500">Your cart is empty.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Your Cart</h1>

      {cartItems.map((item:any) => (
        <div
          key={item.id}
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
              <p className="text-sm text-gray-600">Size: {item.size}</p>
              <p className="text-sm text-gray-600">
                ₹{item.price} × {item.quantity}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => removeFromCart(item)}
              className="text-red-600 text-sm"
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <div className="mt-6 flex justify-between text-lg font-semibold">
        <span>Total:</span>
        <span>₹{total}</span>
      </div>

      <button className="mt-6 w-full bg-black text-white py-3 rounded-md">
        Checkout
      </button>
    </div>
  );
}
