import { IconExchange } from "@tabler/icons-react";
import Image from "next/image";
import React from "react";
// import exchangeIcon from "@/public/assets/exchange_icon.png"
import qualityIcon from "@/public/assets/quality_icon.png";
import contactIcon from "@/public/assets/support_img.png";
import { MessagesSquare, RotateCcw, ShieldCheck } from "lucide-react";

const Footer = () => {
  return (
    <div className="h-screen w-[90vw] mx-auto">
      <div className="grid grid-cols-3">
        <div>
          <RotateCcw />

          <h1>Easy Exchange Policy</h1>
          <p>We offer hassle free exchage policy</p>
        </div>
        <div>
          <ShieldCheck />

          <h1>Easy Exchange Policy</h1>
          <p>We offer hassle free exchage policy</p>
        </div>
        <div>
          <MessagesSquare />

          <h1>Easy Exchange Policy</h1>
          <p>We offer hassle free exchage policy</p>
        </div>
      </div>
      <div></div>
      <div></div>
      <div>© 2023 Forever 21</div>
    </div>
  );
};

export default Footer;
