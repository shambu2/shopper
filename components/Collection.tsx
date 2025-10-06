"use client";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Collection = () => {
  const [productList, setProductList] = useState<any>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await axios.get("http://localhost:3000/api/collections");
        setProductList(result.data);
      } catch (error) {
        console.log(error);
      }
      
    };
  }, []);
  return (
    <div>
      <div className="flex flex-col items-center text-center my-10 gap-4">
        <h1 className="font-bold text-5xl ">
          <span className="text-gray-500 pr-4">Latest</span>Collections{" "}
        </h1>
        <p className="text-lg">
          Discover the latest trends in fashion. Quality fabrics, unique
          designs, and styles that suit every occasion.
        </p>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-10 mt-10">
        {productList.map((p:any)=>{
          return <div key={p.id}>
            <Image src={p.image} alt={p.name} width={200} height={200}/>
            <div className="flex flex-col">
              <div className="text-xl font-bold">{p.name}</div>
              <div className="text-sm">{p.intro}</div>
            </div>
          </div>
        })}
      </div>
    </div>
  );
};

export default Collection;
