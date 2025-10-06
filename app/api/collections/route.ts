import { NextResponse } from "next/server";
import { PrismaClient } from "@/lib/generated/prisma";
const prisma = new PrismaClient();
export async function GET() {
  try {
    const collections = await prisma.product.findMany({
      where: { type: "latest" },
    });
    return NextResponse.json(collections);
  } catch (error) {
    return NextResponse.json(
      { error: "failed to fetch products" },
      { status: 500 }
    );
  }
}
