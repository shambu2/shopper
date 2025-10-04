"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { SelectContent, Value } from "@radix-ui/react-select";
import { form } from "framer-motion/client";
import React, { useState } from "react";
import axios from "axios";

const sizes_list = ["S", "M", "L", "XL"];

const page = () => {
  const [image, setImage] = useState<File | null>(null);
  const [name, setName] = useState<string>("");
  const [intro, setIntro] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [sizes, setSizes] = useState<string>("");

  // const toggleSize = (size: string) => {
  //   setSizes((prev) =>
  //     prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
  //   );
  // };

  const hadleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = new FormData();

    if (image) formData.append("image", image);
    formData.append("name", name);
    formData.append("intro", intro);
    formData.append("description", description);
    formData.append("gender", gender);
    formData.append("category", category);
    formData.append("type", type);
    formData.append("price", price);
    // sizes.forEach((s)=> formData.append("sizes[]",s))
    formData.append("sizes",sizes)

    const res =  axios.post("http://localhost:3000/api/admin", formData)
    console.log( res)
    setImage(null),setName(""),setIntro(""),setDescription(""),setGender(""),setCategory(""),setType(""),setPrice(""),setSizes("")
  };

  return (
    <form onSubmit={hadleSubmit}>
      <div className="flex flex-col gap-3">
        <label htmlFor="" className="text-xl font-semibold  ">
          Upload image
        </label>
        <div className="flex flex-col items-center justify-center gap-4 p-6 border-2 border-dashed rounded-xl border-gray-400 w-80">
          <Input
            id="image"
            name="image"
            type="file"
            className="border  z-10 "
            accept="image/*"
            multiple={false}
            onChange={(e) => setImage(e.target.files?.[0] || null)}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-4 text-xl font-semibold">
        <label htmlFor="">Product name</label>
        <Input
          name="name"
          placeholder="Product name"
          className="w-80"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2 mt-4 text-xl font-semibold">
        <label htmlFor="">Product Intro</label>
        <Input
          name="intro"
          placeholder="Product name"
          className="w-80"
          value={intro}
          onChange={(e) => setIntro(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2 mt-4 text-xl font-semibold">
        <label htmlFor="description">Product description</label>
        <Textarea
          placeholder="write description of product"
          className="w-[50vw]"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="mt-4 flex gap-10">
        <div className="text-xl font-semibold ">
          <div className="mb-2">
            <label htmlFor="" className="">
              Gender
            </label>
          </div>

          <div className="z-10">
            <Select value={gender} onValueChange={(Value) => setGender(Value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent className="bg-black">
                <SelectItem value="men">Men</SelectItem>
                <SelectItem value="women">Women</SelectItem>
                <SelectItem value="kids">Kids</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="text-xl font-semibold ">
          <div className="mb-2">
            <label htmlFor="" className="text-nowrap">
              Sub category
            </label>
          </div>

          <div>
            <Select
              value={category}
              onValueChange={(value) => setCategory(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent className="bg-black">
                <SelectItem value="topware">Topwear</SelectItem>
                <SelectItem value="bottomware">Bottomwear</SelectItem>
                <SelectItem value="winterwear">Winterwear</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="text-xl font-semibold ">
          <div className="mb-2">
            <label htmlFor="" className="">
              Type
            </label>
          </div>

          <div>
            <Select value={type} onValueChange={(value) => setType(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent className="bg-black">
                <SelectItem value="bestseller">Best seller</SelectItem>
                <SelectItem value="latest">Latest collection</SelectItem>
                <SelectItem value="all">all</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="text-xl font-semibold ">
          <div className="mb-2">
            <label htmlFor="" className="">
              Price
            </label>
          </div>

          <div>
            <Input
              name="price"
              placeholder="$ Price"
              className=""
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="mt-4 text-xl font-semibold gap-2 flex flex-col">
        <label htmlFor="sizes">Sizes</label>
        <div className="flex gap-4">
          {sizes_list.map((size) => (
            <Button
              key={size}
              type="button"
              onClick={() => setSizes(size)}
              className={`px-4  py-5 border rounded-lg cursor-pointer hover:bg-blue-200 ${sizes.includes(size)
                  ? "bg-blue-500 text-white"
                  : "bg-blue-200 text-black"
                }`}
            >
              {size}
            </Button>
          ))}
        </div>
      </div>
      <div>
        <button
          type="submit"
          className="bg-white rounded-2xl h-10 text-black font-bold w-[40vw] mt-10 cursor-pointer hover:bg-gray-200"
        >
          Add Product
        </button>
      </div>
    </form>
  );
};

export default page;
