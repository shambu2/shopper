import { NextResponse } from "next/server";
import { PrismaClient } from "@/lib/generated/prisma";
const prisma = new PrismaClient();
export async function GET() {
  const orders = await prisma.order.findMany({
    include:{
        items:true,
        address:true
    }
  });
  
  return NextResponse.json(orders);
}
