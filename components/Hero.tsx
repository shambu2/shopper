import React from "react";
import heroImage from "@/public/assets/hero_img.png";
import Image from "next/image";
const Hero = () => {
  return (
    <div className="border grid md:grid-cols-2 ">
      <div className="flex py-10  gap-4 flex-col md:col-span-1 items-center justify-center">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-base font-bold">
            <p className="w-10 h-[3px] bg-white"></p>OUR BESTSELLERS
          </div>
          <h1 className="text-4xl font-bold font-serif">Latest Arrivals</h1>
          <p className="flex items-center gap-2 text-base font-bold">SHOP NOW <div className="w-10 h-[2px] bg-white"></div></p>
        </div>
      </div>
      <div className="">
        <Image src={heroImage} alt="hero"  className=""/>
      </div>
    </div>
  );
};

export default Hero;
