import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/lib/generated/prisma";
import next from "next";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: id,
      },
    });

    if(!product){
        return NextResponse.json({error:"Product not found"})
    }

    const related = await prisma.product.findMany({
        where:{
            gender: product.gender,
            NOT: {id:product.id}
        },
        take:4
    })

    return NextResponse.json({ product,related });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}
