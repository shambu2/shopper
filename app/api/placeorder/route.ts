import { PrismaClient } from "@/lib/generated/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { useContext } from "react";
import { useCart } from "@/app/context/page";
import { connect } from "http2";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  // this should be server component
  // const { cart } = useCart();
  const data = await req.json(); 
    const { form, cart } = data; // <-- read both

    const { fullName, phone, street, city, state, zip, country } = form;

  const total = cart.reduce((sum:any, item:any) => sum + item.price * item.quantity, 0);
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/login");
  }

  const userId = session.user.id;

  // const formData = await req.formData();
  // const fullName = formData.get("fullName") as string;
  // const phone = formData.get("phone") as string;
  // const street = formData.get("street") as string;
  // const city = formData.get("city") as string;
  // const state = formData.get("state") as string;
  // const zip = formData.get("zip") as string;
  // const country = formData.get("country") as string;

  // const address = {
  //   fullName,
  //   phone,
  //   street,
  //   city,
  //   state,
  //   zip,
  //   country,
  // };
  

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
