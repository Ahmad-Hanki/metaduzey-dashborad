import prisma from "@/db/client";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

interface ImageProps {
    params:{
        id:string
    }
}


export async function PATCH(req:Request,{params}:ImageProps) {

    const { isAuthenticated } = getKindeServerSession();
    const auth = await isAuthenticated();
  
    if (!auth) {
      return NextResponse.json({ message: "Not Authenticated" }, { status: 401 });
    }

    const {image} = await req.json();

    if (!image) {
        return NextResponse.json({ message: "Invalid Data" }, { status: 401 });
    }

    try {
        await prisma.therapy.update({
            where: {
                id:params.id
            },
            data: {
                imageUrl:image
            }
        })

        return NextResponse.json({ }, { status: 200 });

    } catch(err) {
        console.log(err);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });

    }
}