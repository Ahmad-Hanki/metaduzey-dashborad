import prisma from "@/db/client";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

interface TherapyPlaceProps {
  params: {
    id: string;
  };
}

export async function PATCH(req: Request, { params }: TherapyPlaceProps) {
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
    await prisma.therapyPlace.update({
      where: {
        id: params.id,
      },
      data: {
        name,
      },
    });
    await prisma.$disconnect()

    return NextResponse.json({}, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 500 });
  } finally{
    await prisma.$disconnect()

  }
}

export async function DELETE(req: Request, { params }: TherapyPlaceProps) {
  const { isAuthenticated } = getKindeServerSession();
  const auth = await isAuthenticated();

  if (!auth) {
    return NextResponse.json({ message: "Not Authenticated" }, { status: 401 });
  }

  try {
    await prisma.therapyPlace.delete({
      where: {
        id: params.id,
      },
    });


    return NextResponse.json({}, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 500 });
  } 
}
