import Navbar from "@/components/Navbar";
import { div } from "framer-motion/client";
import { List, Rows, ShoppingBag, SquarePlus } from "lucide-react";
import Link from "next/link";

// app/admin/layout.tsx
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen w-[98vw]  ">
      <Navbar />
      <div className="flex-1 flex flex-row ">
        <div className="bg-gray-600 hidden md:block  w-60">
          <div className="text-2xl flex items-center pt-2 px-2 font-bold mb-4">Admin</div>
          <Link href={'/admin/add'}>
          <div className="flex gap-2 px-2  py-2 w-full items-center mb-2 cursor-pointer">
            <SquarePlus size={50}/>
            <div className="text-lg">Add New Product</div>
          </div>
          </Link>

          <Link href={'/admin/list'}>
          <div className="flex gap-2 px-2  py-2 w-full items-center mb-2 cursor-pointer">
            <ShoppingBag size={50}/>
            <div className="text-lg"> Items List</div>
          </div>
          </Link>

          <Link href={'/admin/orders'}>
            <div className="flex gap-2 px-2  py-2 w-full items-center mb-2 cursor-pointer">
            <Rows size={50}/>
            <div className="text-lg">Orders</div>
          </div>

          </Link>
          
          
          
        </div>
        <div className="flex-1 overflow-auto p-4">{children}</div>
      </div>
    </div>
  );
}
