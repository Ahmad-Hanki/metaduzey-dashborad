import prisma from "@/db/client";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  const { isAuthenticated } = getKindeServerSession();
  const auth = await isAuthenticated();

  if (!auth) {
    return NextResponse.json({ message: "Not Authenticated" }, { status: 401 });
  }

  const { name } = await req.json();

  if (!name || name == "") {
    return NextResponse.json({ message: "Invalid Data" }, { status: 400 });
  }

  try {
    await prisma.therapyType.create({
      data: {
        name,
      },
    });
    await prisma.$disconnect();

    return NextResponse.json({}, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 500 });
  } finally{
    await prisma.$disconnect();
  }
}


export async function GET(req: Request) {
   try {
    const types = await prisma.therapyType.findMany();
    return NextResponse.json(types, { status: 200 });

   }catch (err) {
    return NextResponse.json({message:'No Data Found!'}, { status: 404 });

   } finally{ 
    prisma.$disconnect();
   }
} 


