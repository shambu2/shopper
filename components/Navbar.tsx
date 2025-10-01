"use client";
import React, { useState } from "react";
import Link from "next/link";

import { ChevronLeft, Handbag,  MenuIcon, SearchIcon, UserIcon } from "lucide-react";
// import DesktopNav from "./DesktopNav";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav>
    <div className="flex w-[90vw] mx-auto gap-2 justify-between items-center   h-20">
        
      <div className="flex items-center gap-2 h-20 cursor-pointer" onClick={()=> window.location.href = "/"}>
        <svg fill="none" height="60" viewBox="0 0 32 32" width="60">
          <path
            clipRule="evenodd"
            d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
            fill="currentColor"
            fillRule="evenodd"
          />
        </svg>
        <p className="text-xl font-semibold text-nowrap">Forever 21</p>
      </div>
      <div className="hidden md:flex">
        <ul className="flex items-center font-semibold lg:gap-10 md:gap-5 list-none text-nowrap">
        <Link href="/">  <li>Home</li></Link>
        <Link href="/collection">  <li>Collection</li></Link>
        <Link href="/about">  <li>About</li></Link>
        <Link href="/contact">  <li>Contact</li></Link>
        <Link href="/admin">  <li className=" ">Admin Panel</li></Link>
        </ul>
      </div>
      <div className="flex items-center gap-5">
        <div className="flex gap-5 ">
          <SearchIcon />
          <UserIcon />

          <Handbag />
        </div>
        <div className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          <MenuIcon className="cursor-pointer" />
        </div>
      </div>
    </div>
    {isOpen &&(
        <div className="fixed inset-0 bg-zinc-900 flex flex-col text-4xl font-semibold">
          <div className="flex items-center border-b border-gray-500 cursor-pointer" onClick={()=>setIsOpen(!isOpen)}>
            <ChevronLeft size={80}/>
            <p>Back</p>
          </div>
          <div>
            <ul className="flex flex-col justify-center ">
                <li className="py-5 border-b border-gray-600 pl-10 hover:bg-white hover:text-black cursor-pointer">Home</li>
                <li className="py-5 border-b border-gray-600 pl-10 hover:bg-white hover:text-black cursor-pointer">Collection</li>
                <li className="py-5 border-b border-gray-600 pl-10 hover:bg-white hover:text-black cursor-pointer">About</li>
                <li className="py-5 border-b border-gray-600 pl-10 hover:bg-white hover:text-black cursor-pointer">Contact</li>
                <li className="py-5 border-b border-gray-600 pl-10 hover:bg-white hover:text-black cursor-pointer">Admin Panel</li>
            </ul>

          </div>
        </div>
    )}
    </nav>
  );
};

export default Navbar;
