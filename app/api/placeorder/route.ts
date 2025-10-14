import { PrismaClient } from "@/lib/generated/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/login");
  }

  const userId = session.user.id;

  const formData = await req.formData();
  const fullName = formData.get("fullName") as string;
  const phone = formData.get("phone") as string;
  const street = formData.get("street") as string;
  const city = formData.get("city") as string;
  const state = formData.get("state") as string;
  const zip = formData.get("zip") as string;
  const country = formData.get("country") as string;

  const address = {
    fullName,
    phone,
    street,
    city,
    state,
    zip,
    country,
  };

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email ? session.user.email : "" },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const order = await prisma.order.create({
        data:{
            userId:user.id,
            items:
        }
    })

  } catch (error) {}

  return NextResponse.json(address);
}
