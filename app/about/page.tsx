import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import React from "react";
import aboutImage from "@/public/assets/about_img.png";

const page = () => {
  return (
    <div className="w-[90vw] mx-auto ">
      <Navbar />
      <div className="">
        <h1 className="text-4xl mb-10 font-bold text-center">
          About <span className="font-bold">us :</span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 place-items-center gap-10">
          <Image src={aboutImage} alt="about" width={500} height={500} />
          <div className="col-span-2 text-xl w-[80%] flex flex-col gap-8 justify-center">
            <p>
              Forever was born out of a passion for innovation and a desire to
              revolutionize the way people shop online. Our journey began with a
              simple idea: to provide a platform where customers can easily
              discover, explore, and purchase a wide range of products from the
              comfort of their homes.{" "}
            </p>
            <p>
              Since our inception, we've worked tirelessly to curate a diverse
              selection of high-quality products that cater to every taste and
              preference. From fashion and beauty to electronics and home
              essentials, we offer an extensive collection sourced from trusted
              brands and suppliers.
            </p>
            <h1 className="tex-3xl font-bold">OUR MISSION:</h1>
            <p>
              Our mission at Forever is to empower customers with choice,
              convenience, and confidence. We're dedicated to providing a
              seamless shopping experience that exceeds expectations, from
              browsing and ordering to delivery and beyond.
            </p>
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-3xl font-black mt-20 pl-6">Why choose us</h1>
        <div className="grid border grid-cols-1 md:grid-cols-3 gap-10 mt-10 my-10">
          <div className="md:border-r border-b py-20 flex flex-col px-20">
            <h1 className="text-2xl font-bold">Quality Assurance:</h1>
            <p>
              We meticulously select and vet each product to ensure it meets our
              stringent quality standards.
            </p>
          </div>
          <div className="md:border-r border-b py-20 flex flex-col px-20">
            <h1 className="text-2xl font-bold">Convenience</h1>
            <p>
              With our user-friendly interface and hassle-free ordering process,
              shopping has never been easier.
            </p>
          </div>
          <div className="md:border-r border-b py-20 flex flex-col px-20">
            <h1 className="text-2xl font-bold">Exceptional Customer Service:</h1>
            <p>
              Our team of dedicated professionals is here to assist you the way,
              ensuring your satisfaction is our top priority.
            </p>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default page;
