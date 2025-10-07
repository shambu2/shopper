"use client";

import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Collection = () => {
  const [productLIst, setProductList] = React.useState<any>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await axios.get("http://localhost:3000/api/collections");
        setProductList(products.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div >
      <div className="flex flex-col items-center text-center my-10 gap-4">
        <h1 className="font-bold text-5xl ">
          <span className="text-gray-500 pr-4">Latest</span>Collections{" "}
        </h1>
        <p className="text-lg">
          Discover the latest trends in fashion. Quality fabrics, unique
          designs, and styles that suit every occasion.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  gap-4">
        {productLIst.map((product: any) => (
          <div key={product.id} >
            <div >
              <Image
                src={product.image}
                alt={product.name}
                className="min-w-full h-full rounded-xl mb-4"
                width={300} height={300}
              />
              <div className="text-lg font-bold">
                <p className="min-w-full overflow-">{product.name}</p>
                <p>$  {product.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collection;
