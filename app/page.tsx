import Image from "next/image";
import heroImage from "@/public/assets/hero_img.png"
import Hero from "@/components/Hero";
import Collection from "@/components/Collection";
import BestSeller from "@/components/BestSeller";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className=" w-[90vw] mx-auto ">
      <Navbar/>
      <Hero/>
      <Collection/>
      <BestSeller/>
      <Footer/>
    </div>
  );
}
