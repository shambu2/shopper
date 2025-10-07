"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import axios from "axios";

const page = () => {
  const [products, setProducts] = useState<any>([]);
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

  return (
    <div>
      <Navbar />
      <div>{products.name}</div>
    </div>
  );
};

export default page;
