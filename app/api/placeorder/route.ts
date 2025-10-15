import { PrismaClient } from "@/lib/generated/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const data = await req.json(); 
    const { form, cart } = data; 

    const { fullName, phone, street, city, state, zip, country } = form;

  const total = cart.reduce((sum:any, item:any) => sum + item.price * item.quantity, 0);
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/login");
  }

  const userId = session.user.id;

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email ? session.user.email : "" },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const addressOfUser = await prisma.address.create({
      data: {
        fullName,
        phone,
        street,
        city,
        state,
        zip,
        country,
      },
    });

    if (!addressOfUser) {
      return NextResponse.json({ error: "Address not found" }, { status: 404 });
    }

    const order = await prisma.order.create({
      data: {
        userId: user.id,
        status: "pending",
        total: total,
        addressId: addressOfUser.id,
        items: {
          create: cart.map((item:any) => {
            return {
              name: item.name,
              price: item.price,
              image: item.image,
              intro: item.intro,
              quantity: item.quantity,
              sizes: item.sizes,
            };
          }),
        },
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
