"use client";
import Navbar from "@/components/Navbar";
import axios from "axios";
import { X } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
const page = () => {
  const [productList, setProductList] = useState<any>([]);
  const router = useRouter();
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await axios.get("http://localhost:3000/api/products/items");
      setProductList(res.data);
    };
    fetchProduct();
  }, []);
  const deleteProduct = async (id: string) => {
    try {
          axios.delete(`http://localhost:3000/api/products/items/${id}`);
          setProductList((prev:any) => prev.filter((p:any)=> p.id !== id))
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };
  return (
    <div className="max-w-[90%] mx-auto  ">
      <h1 className="text-xl font-bold">All Products</h1>
      <div>
        <div className="md:grid md:grid-cols-8 gap-2 md:p-2 md:my-2 flex justify-between py-2 px-2  items-center border border-gray-500 text-sm  md:text-lg font-semibold">
          <p>Image</p>
          <p className="col-span-4">Name</p>
          <p>Category</p>
          <p>Price</p>
          <p>Action</p>
        </div>

        {productList.map((product: any) => {
          return (
            <div
              key={product.id}
              className="grid grid-cols-8 gap-4 p-2 my-2  items-center border border-gray-500"
            >
              <img
                src={product.image}
                alt=""
                className="w-full h-full max-h-20 max-w-20 aspect-square"
              />
              <p className="col-span-4 text-wrap ">{product.name}</p>
              <p>{product.gender}</p>
              <p>{product.price}</p>
              <X className="cursor-pointer" onClick={()=>deleteProduct(product.id)} />
            </div>
          );
        })}
      </div>
    </div>
    // <div>hi</div>
  );
};

export default page;
