import { NextResponse } from "next/server";
const product = {
    name:"shambu",
    review:"",
    price:"23",
    intro:"f as af asdf a",
    sizes:"adsfas",
    description:" asdfasdf",
    gender:"asdf",
    image:"sdfDSA",
    type:"ASDF",    
    category:"ASDF"
}
export async function GET(){
    return NextResponse.json({data:product})
}