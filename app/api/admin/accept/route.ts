import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/lib/generated/prisma";
const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    const body = await req.json();
    const id = body.id;
    let status = body.status;
    if(status === 'pending'){
        status = "accepted"
    } else if(status === 'accepted'){
        status = "pending"
    }


    if (!Number.isFinite(id)) {
        return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    const orderUpdate = await prisma.order.update({
        where: {
            id: id
        },
        data: {
            status: status
        }
    });

    return NextResponse.json(orderUpdate);
}