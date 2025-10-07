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
import React, { useEffect, useState } from "react";

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
        <div className="col-span-4  lg:col-span-4">
          <div className="flex w-full  justify-between ">
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
          <div>
            {productLIst.map((product:any)=>{
              return <div key={product.id} className="flex gap-3 items-center">
                <Image src={product.image} alt={product.name} width={200} height={200}/>
                <div className="flex flex-col">
                  <div className="text-xl font-bold">{product.name}</div>
                  <div className="text-sm">{product.intro}</div>
                </div>
              </div>
            })}
          </div>
        </div>
      </div>
      {/* <Footer/> */}
    </div>
  );
};

export default page;
