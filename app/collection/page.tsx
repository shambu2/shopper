import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

const page = () => {
  return (
    <div>
      <Navbar />
      <div className="grid gap-20 lg:grid-cols-5 grid-cols-6 w-[90vw] mt-6 mx-auto">
        <div className="col-span-2  lg:col-span-1  md:flex flex-col gap-10">
          <h1 className="text-2xl font-bold">FILTERS</h1>
          <div className="border pl-6 py-6 space-y-3">
            <p className="text-xl">CATEGORIES</p>
            <div className="space-y-3">
              <div>
                <input type="checkbox" name="men" id="" />
                <label>Men</label>
              </div>
              <div>
                <input type="checkbox" name="women" id="" />
                <label>Women</label>
              </div>
              <div>
                <input type="checkbox" name="kids" id="" />
                <label>Kids</label>
              </div>
            </div>
          </div>
          <div className="border pl-6 py-6 space-y-3">
            <p className="text-xl">TYPE</p>
            <div className="space-y-3">
              <div>
                <input type="checkbox" name="topper" id="" />
                <label>Topwear</label>
              </div>
              <div>
                <input type="checkbox" name="bottomer" id="" />
                <label>Bottomwear</label>
              </div>
              <div>
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
          <div>images</div>
        </div>
      </div>
      {/* <Footer/> */}
    </div>
  );
};

export default page;
