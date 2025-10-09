import { NextResponse } from "next/server";
import { PrismaClient } from "@/lib/generated/prisma";
const prisma = new PrismaClient();

export async function GET() {

    const products = await prisma.product.findMany();

    return NextResponse.json(products);
    
}
