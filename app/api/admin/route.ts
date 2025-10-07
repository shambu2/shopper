import { NextResponse,NextRequest } from "next/server";
import { bucket } from "@/lib/gcp";
// import { PrismaClient } from "@/lib/generated/prisma";
import { PrismaClient } from "@/lib/generated/prisma";

const prisma = new PrismaClient(); 


export async function POST(req:NextRequest){
    try {
        const formData = await req.formData();
        const file =  formData.get("image") as File | null;
        const name =  formData.get("name") as string;
        const reviews =  formData.get("reviews") as string ;
        const price =  parseFloat(formData.get("price") as string) 
        const intro = formData.get("intro") as string;
        const sizes = formData.get("sizes") as string ;
        const description = formData.get("description") as string | "";
        const gender = formData.get("gender") as string;
        const type = formData.get("type") as string;
        const category = formData.get("category") as string;
        if(!file){
            return NextResponse.json({message: "No file uploaded"},{status:400})

        }

        const gcpFile = bucket.file(`${Date.now()}-${file.name}`)

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        await gcpFile.save(buffer,{
            contentType: file.type,
            public: true
        })

        const publicUrl = `https://storage.googleapis.com/forever601/${gcpFile.name}`

        const product = await prisma.product.create({
            data:{
                name,
                review: reviews ,
                price,
                intro,
                sizes,
                description,
                gender,
                image: publicUrl,
                type,
                category
            }
                
                
            
        })
        return NextResponse.json(product,{status:201})

    } catch (error:any) {
        console.log(error)
        return NextResponse.json({message: "upload failed"},{status:500})
    }
}