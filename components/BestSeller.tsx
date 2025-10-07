"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const BestSeller = () => {
  const [productLIst, setProductList] = useState<any>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const result = await axios.get("http://localhost:3000/api/bestseller");
      setProductList(result.data);
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <div className="flex flex-col items-center text-center my-10 gap-4">
        <h1 className="font-bold text-5xl ">
          <span className="text-gray-500 pr-4">BEST</span>SELLERS{" "}
        </h1>
        <p className="text-lg">
          Step into style with our exclusive clothing line. Trendy, affordable,
          and crafted for you—because your wardrobe deserves the best.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  gap-4">
        {productLIst.map((product: any) => (
          <div key={product.id}>
            <Link href={`/product/${product.id}`}>
            <div>

              <Image
                src={product.image}
                alt={product.name}
                className="min-w-full h-full rounded-xl mb-4"
                width={300}
                height={300}
              />
              <div className="text-lg font-bold">
                <p className="min-w-full overflow-">{product.name}</p>
                <p>$ {product.price}</p>
              </div>
            </div>
            </Link>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
