import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/lib/generated/prisma";
import { Storage } from "@google-cloud/storage";

const prisma = new PrismaClient();
const storage = new Storage({
  projectId: process.env.GCP_PROJECT_ID,
  credentials: {
    client_email: process.env.GCP_CLIENT_EMAIL,
    private_key: process.env.GCP_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
});

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  try {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });
    if (!product) {
      console.warn("Product not found:", id);
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }
    const fileName = product.image.split("/").pop();
    if (fileName) {
      console.log(" Trying to delete file:", fileName);
      await storage
        .bucket(process.env.GCP_BUCKET_NAME || "")
        .file(fileName)
        .delete({ ignoreNotFound: true });
      console.log(" Deleted from GCS:", fileName);
    }

    await prisma.product.delete({
      where: {
        id,
      },
    });
    console.log("Product deleted:", id);

    return NextResponse.json(
      { message: "Product deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting product" },
      { status: 500 }
    );
  }
}
