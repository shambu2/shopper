import { IconExchange } from "@tabler/icons-react";
import Image from "next/image";
import logoIcon from "@/public/assets/logo.png";
import React from "react";
// import exchangeIcon from "@/public/assets/exchange_icon.png"
import qualityIcon from "@/public/assets/quality_icon.png";
import contactIcon from "@/public/assets/support_img.png";
import { MessagesSquare, RotateCcw, ShieldCheck } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="h-screen pt-4 mx-auto w-[90vw]  ">
      <div className="grid grid-cols-3 justify-center items-center gap-10 mt-10">
        <div className="grid justify-center items-center text-xl ">
          <RotateCcw size={50} className="mb-8 ml-22" />

          <h1 className="font-bold text-center">Easy Exchange Policy</h1>
          <p className="text-gray-400 text-center">
            We offer hassle free exchage policy
          </p>
        </div>
        <div className="grid justify-center items-center text-xl">
          <ShieldCheck size={50} className="mb-8 ml-18" />

          <h1 className="font-bold text-center">Easy Exchange Policy</h1>
          <p className="text-gray-400 text-center">
            {" "}
            We offer hassle free exchage policy
          </p>
        </div>
        <div className="grid justify-center items-center text-xl">
          <MessagesSquare size={50} className="mb-8 ml-16" />

          <h1 className="font-bold text-center">Easy Exchange Policy</h1>
          <p className="text-gray-500 text-center">
            We offer hassle free exchage policy
          </p>
        </div>
      </div>
      <div className="mt-30 mb-20 text-center space-y-8">
        <h1 className="text-6xl font-bold">Subscribe now & get 20% off</h1>
        <p className="text-2xl font-semibold">
          Get notified when we launch new products or services
        </p>
        <div className="flex justify-center items-center gap-6">
          <input
            type="email"
            name="email"
            id="email"
            className="bg-gray-200 h-9 pl-4  rounded-lg w-80"
          />
          <Button className="text-black font-semibold bg-white rounded-lg cursor-pointer hover:bg-blue-500 hover:text-white">
            Subscribe
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-2 border-b-[1px] border-gray-600 pb-10 items-center justify-between">
        <div className="grid justify-center items-center">
          <svg fill="none" height="60" viewBox="0 0 32 32" width="60">
            <path
              clipRule="evenodd"
              d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
              fill="currentColor"
              fillRule="evenodd"
            />
          </svg>
          <p className="w-2/3">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen boo
          </p>
        </div>
        <div className="flex justify-evenly">
          <div className="flex flex-col justify-center items-center gap-4">
            <h1 className="text-xl font-black md:pt-14">COMPANY</h1>
            <ul className="text-[18px] space-y-2">
              <li>Home</li>
              <li>About us</li>
              <li>Delivery</li>
              <li>Privacy policy</li>
            </ul>
          </div>
          <div className="flex flex-col justify-center  gap-4">
            <h1 className="text-xl font-black md:pt-14">GET IN TOUCH</h1>
            <div className="text-[18px] space-y-2">
              <p>+91-9876543210</p>
              <p>info.forever601@example.com</p>
              <p>Instagram</p>
              <p>Facebook</p>
              
            </div>
          </div>
        </div>
        
      </div>
      <div className="flex justify-center items-center pt-12">
        Copyright 2024@ This website and brand - All Right Reserved.
      </div>
    </div>
  );
};

export default Footer;
