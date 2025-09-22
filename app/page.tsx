import Image from "next/image";
import heroImage from "@/public/assets/hero_img.png"
import Hero from "@/components/Hero";
import Collection from "@/components/Collection";

export default function Home() {
  return (
    <div className=" w-[90vw] mx-auto ">
      <Hero/>
      <Collection/>
    </div>
  );
}
