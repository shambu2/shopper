import { PrismaClient } from "@/lib/generated/prisma";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();
export async function GET(){

    const products = await prisma.product.findMany()
    return NextResponse.json(products);
    // console.log(products)
}   