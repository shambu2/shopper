import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="w-[90vw]  mx-auto ">
      <Navbar />
      <div>
        <h1 className="px-2 text-3xl text-center font-bold mb-10">Contact</h1>
        <div className="px-2 grid grid-cols-2  place-self-start gap-20">
          <Image
            src="/assets/contact_img.png"
            alt="contact"
            width={500}
            height={500}
            
          />
          <div>
            <h1 className="text-3xl font-bold mb-10">Our Store</h1>
            <div className="text-xl flex flex-col gap-5 mb-5">
              <div className="">
                <p>54709 Willms Station</p>
                <p>Suite 350, Washington, USA</p>
              </div>
              <div>
                <p>Tel: (415) 555-0132</p>
                <p>Email: admin@forever.com</p>
              </div>
            </div>

            <h1 className="text-3xl font-bold mb-5">Careers at Forever</h1>
            <p className="text-xl mb-5">Learn more about our teams and job openings.</p>
            <Button className="bg-white text-black">Explore Jobs</Button>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default page;
