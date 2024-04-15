import prisma from "@/db/client";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export const PATCH = async (req: Request) => {

  const { isAuthenticated } = getKindeServerSession();
  const auth = await isAuthenticated();
  if (!auth) {
    return NextResponse.json({ message: "Not Authenticated" }, { status: 401 });
  }

  const { appointmentId, checked } = await req.json();
  if (!appointmentId) {
    return NextResponse.json({ message: "No Client" }, { status: 404 });
  }

  await prisma.$disconnect();

  try {
    await prisma.appointment.update({
      where: {
        id: appointmentId,
      },
      data: {
        checked,
      },
    });
    await prisma.$disconnect();
    return NextResponse.json({ }, { status: 200 });

  } catch (err) {
    console.log(err);
  } finally {
    await prisma.$disconnect();
  }
};











export const POST = async (req: Request) => {

  const { name, email, tel, therapy, destek, service, contact, place } =
    await req.json();

  if (!name) {
       console.log('here')
    return NextResponse.json({ message: "No name" }, { status: 401 });
 
  }
  if (!email) {
       console.log('here')
    return NextResponse.json({ message: "No email" }, { status: 401 });
  }
  if (!tel) {
       console.log('here')
    return NextResponse.json({ message: "No tel" }, { status: 401 });
  }
  if (!therapy) {
       console.log('here')
    return NextResponse.json({ message: "No therapy" }, { status: 401 });
  }
  if (!destek) {
       console.log('here')
    return NextResponse.json({ message: "No subject" }, { status: 401 });
  }
  if (!service) {
       console.log('here')
    return NextResponse.json({ message: "No service" }, { status: 401 });
  }
  if (!contact) {
       console.log('here')
    return NextResponse.json({ message: "No contact" }, { status: 401 });
  }
  if (!place) {
       console.log('here')
    return NextResponse.json({ message: "No place" }, { status: 401 });
  }
  console.log(therapy);

    await prisma.appointment.create({
      data: {
        name,
        email,
        tel,
        destek,
        service,
        contact,
        place,
        therapyId: therapy,
      },
    });
    await prisma.$disconnect();
    return NextResponse.json({ }, { status: 200 });
  
};
