"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import axios from "axios";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const sizes = ["S", "M", "L", "XL"];

const page = () => {
  const [products, setProducts] = useState<any>();
  const [selected, setSelected] = useState<string | null>(null);

  const params: any = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      const product = await axios.get(
        `http://localhost:3000/api/single/${params.id}`
      );
      setProducts(product.data);
    };
    fetchProduct();
  }, []);
  if (!products) {
    return (
      <div>
        <Navbar />
        <div className="flex justify-center items-center h-screen">Loading</div>
      </div>
    );
  }
  return (
    <div className="">
      <div>
        <Navbar />
        <hr className="mb-4" />

        <div className="grid grid-rows-1 md:grid-cols-2 gap-10 p-6 md:p-12 max-w-[90%] mx-auto">
          <div className="flex-1  flex justify-start">
            <div className="relative w-full h-full max-h-3/4  aspect-square ">
              <Image
                src={products.image}
                alt={products.name}
                fill
                className="object-contain rounded-lg"
              />
            </div>
          </div>

          {/* RIGHT: Product Info */}
          <div className="flex-2">
            <h2 className="text-3xl font-semibold mb-2">{products.name}</h2>

            <div className="flex items-center gap-2 mb-2">
              <span className="text-red-500 text-xl">★★★★☆</span>
              <span className="text-base text-gray-500">124</span>
            </div>

            <p className="text-3xl font-bold my-4">${products.price}</p>

            <p className="text-gray-300 my-5 text-lg font-semibold max-w-2xl">
              {products.intro}
            </p>

            {/* Size Selector */}
            <div className="my-5">
              <p className="text-xl font-medium mb-2">Select Size</p>
              <div className="flex gap-3 flex-wrap">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelected(size)}
                    className={`px-5 py-3 border rounded-md font-medium transition 
                ${
                  selected === size
                    ? "bg-blue-500 text-white border-blue"
                    : "bg-gray-500 hover:bg-gray-600 border-gray-300"
                }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart Button */}
            <button className="w-full md:w-auto bg-white text-black py-5 px-10 rounded-md hover:bg-gray-100 transition">
              ADD TO CART
            </button>

            {/* Product Info */}
            <div className="mt-6 text-gray-300 text-sm space-y-1">
              <p>100% Original product.</p>
              <p>Cash on delivery is available on this product.</p>
              <p>Easy return and exchange policy within 7 days.</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        hi
      </div>
    </div>
  );
};

export default page;
