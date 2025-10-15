"use client"
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

const page = () => {

  const [productLIst,setProductList] = React.useState<any>([])

  useEffect(()=>{
    const fetchProducts = async()=>{
      try {
        const products = await axios.get("http://localhost:3000/api/products")
        setProductList(products.data)
        
      } catch (error) {
        console.log(error)
      }
    }
    fetchProducts();
  },[])
  
  return (
    <div>
      <Navbar />
      <div className="grid gap-20 lg:grid-cols-5 grid-cols-6 w-[90vw] mt-6 mx-auto">
        <div className="col-span-2  lg:col-span-1  md:flex flex-col gap-10">
          <h1 className="text-2xl font-bold">FILTERS</h1>
          <div className="border pl-6 py-6 space-y-3">
            <p className="text-xl">CATEGORIES</p>
            <div className="space-y-3 ">
              <div className="flex gap-3">
                <input type="checkbox" name="men" id="" />
                <label>Men</label>
              </div>
              <div className="flex gap-3">
                <input type="checkbox" name="women" id="" />
                <label>Women</label>
              </div>
              <div className="flex gap-3">
                <input type="checkbox" name="kids" id="" />
                <label>Kids</label>
              </div>
            </div>
          </div>
          <div className="border pl-6 py-6 space-y-3">
            <p className="text-xl">TYPE</p>
            <div className="space-y-3">
              <div className="flex gap-3">
                <input type="checkbox" name="topper" id="" />
                <label>Topwear</label>
              </div>
              <div className="flex gap-3">
                <input type="checkbox" name="bottomer" id="" />
                <label>Bottomwear</label>
              </div>
              <div className="flex gap-3">
                <input type="checkbox" name="winterwear" id="" />
                <label>Wintewear</label>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-4   lg:col-span-4">
          <div className="flex w-full pb-10  justify-between ">
            <div className="text-2xl font-bold text-nowrap">Our Collection</div>

            <div>
              <Select defaultValue="relevant">
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevant">Sort by: Relavent</SelectItem>
                  <SelectItem value="low-high">
                    Sort by: Low to High{" "}
                  </SelectItem>
                  <SelectItem value="high-low">Sort by: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
      </div>
    </div>
  );
};

export default page;
