import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/lib/generated/prisma";
const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    // parse JSON body and coerce/validate id as a number
    const body = await req.json();
    // const id = Number((body as any)?.id);
    const id = body.id;
    let status = body.status;
    // const statusUpdate = status
    if(status === 'pending'){
        status = "accepted"
    } else if(status === 'accepted'){
        status = "pending"
    }


    if (!Number.isFinite(id)) {
        return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    // update the order by numeric id; replace the data object with actual fields you want to update
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