import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/lib/generated/prisma";

const prisma = new PrismaClient();

export async function GET(request:NextRequest,context:{params:Promise<{id:string}>}){
    const {id} =  await context.params
    const product = await prisma.product.findUnique({
        where:{
            id:id
        }
    })

    return NextResponse.json(product)
}