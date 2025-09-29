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
import { SelectContent } from "@radix-ui/react-select";
import { CloudUpload, Upload } from "lucide-react";
import React from "react";

const sizes_list = ["S", "M", "L", "XL"];

const page = () => {
  const [sizes, setSizes] = React.useState<string[]>([]);

  const toggleSize = (size: string) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };
  return (
    <form>
      <div className="flex flex-col gap-3">
        <label htmlFor="" className="text-xl font-semibold  ">
          Upload image
        </label>
        <div className="flex flex-col items-center justify-center gap-4 p-6 border-2 border-dashed rounded-xl border-gray-400 w-80">
          <label
            htmlFor="file-upload"
            className="flex flex-col items-center gap-2 cursor-pointer"
          >
            <Upload className="w-10 h-10 text-gray-600" />
            <span className="text-gray-700 font-medium">Click to upload</span>
          </label>
          <input
            id="image"
            name="image"
            type="file"
            className="hidden"
            // onChange={(e) => console.log(e.target.files)}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-4 text-xl font-semibold">
        <label htmlFor="">Product name</label>
        {/* <input type="text" name="name" placeholder="Product name" /> */}
        <Input name="name" placeholder="Product name" className="w-80" />
      </div>
      <div className="flex flex-col gap-2 mt-4 text-xl font-semibold">
        <label htmlFor="">Product Intro</label>
        <Input name="name" placeholder="Product name" className="w-80" />
      </div>
      <div className="flex flex-col gap-2 mt-4 text-xl font-semibold">
        <label htmlFor="description">Product description</label>
        <Textarea
          placeholder="write description of product"
          className="w-[50vw]"
        ></Textarea>
      </div>
      <div className="mt-4 flex gap-10">
        <div className="text-xl font-semibold ">
          <div className="mb-2">
            <label htmlFor="" className="">
              Gender
            </label>
          </div>

          <div className="z-10">
            <Select>
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
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent className="bg-black">
                <SelectItem value="men">Topware</SelectItem>
                <SelectItem value="women">Bottomware</SelectItem>
                <SelectItem value="kids">Other</SelectItem>
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
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent className="bg-black">
                <SelectItem value="men">Best seller</SelectItem>
                <SelectItem value="women">Latest collection</SelectItem>
                <SelectItem value="kids">all</SelectItem>
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
            <Input name="price" placeholder="$ Price" className="" />
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
              onClick={() => toggleSize(size)}
              className={`px-4  py-5 border rounded-lg cursor-pointer hover:bg-blue-200 ${
                sizes.includes(size)
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
