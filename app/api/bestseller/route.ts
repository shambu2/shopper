import { NextResponse } from "next/server";
import { PrismaClient } from "@/lib/generated/prisma";
const prisma = new PrismaClient();

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: { type: "bestseller" },
    });
    return NextResponse.json(products);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "failed to fetch products" }, { status: 500 });
  }

  
}
