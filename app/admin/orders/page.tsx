"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

const page = () => {
  const [orders, setOrders] = useState<any>([]);
  const [trigger,setTrigger] = useState(false)

  const handleClick = async ({id,status}:{id:number,status:string}) => {
    setTrigger(!trigger)
    const res = await axios.post("http://localhost:3000/api/admin/accept",{id,status})
    if (res.status === 200) {
      alert("Order updated successfully");
    } else {
      alert("Error updating order");
    }
  }

  useEffect(() => {
    const getOrders = async () => {
      const res = await axios.get("http://localhost:3000/api/orderlist");
      setOrders(res.data);
    };
    getOrders();
  }, [trigger]);

  

  return (
    <div>
      <h1>Orders</h1>
      {orders.map((order: any) => (
        <div
          key={order.id}
          style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}
        >
          <p>
            <strong>Order ID:</strong> {order.id}
          </p>
          <p>
            <strong>Status:</strong> {order.status}
          </p>
          <p>
            <strong>Total:</strong> ${order.total}
          </p>
          {/* <p><strong>Customer:</strong> {order.user.name}</p> */}
          <p>
            <strong>Address:</strong> {order.address.street},{" "}
            {order.address.city}
          </p>
          <p>
            <strong>Items:</strong>
          </p>
          <ul>
            {order.items.map((item: any) => (
              <li key={item.id}>
                {item.name} - ${item.price}
              </li>
            ))}
          </ul>
          <div onClick={()=>handleClick({id:order.id,status:order.status})}>
            {order.status === "pending" && (
              <button className="px-4 py-2 bg-green-500 rounded-2xl text-lg font-bold text-black mt-4">
                Accept
              </button>
            )}
            {order.status !== "pending" && (
              <button className="px-4 py-2 bg-red-500 rounded-2xl text-lg font-bold text-black mt-4">
                Reject
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default page;
