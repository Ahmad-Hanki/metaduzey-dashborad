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

  try {

    await prisma.appointment.update({
      where: {
        id: appointmentId,
      },
      data: {
        checked,
      },
    });
    return NextResponse.json({}, { status: 200 });
  } catch (err) {
    console.log(err);
  } finally {
  }
};

export const POST = async (req: Request) => {
  const { name, email, tel, therapy, destek, service, contact, place } =
    await req.json();

  if (!name) {
    return NextResponse.json({ message: "No name" }, { status: 401 });
  }
  if (!email) {
    return NextResponse.json({ message: "No email" }, { status: 401 });
  }
  if (!tel) {
    return NextResponse.json({ message: "No tel" }, { status: 401 });
  }
  if (!therapy) {
    return NextResponse.json({ message: "No therapy" }, { status: 401 });
  }
  if (!destek) {
    return NextResponse.json({ message: "No subject" }, { status: 401 });
  }
  if (!service) {
    return NextResponse.json({ message: "No service" }, { status: 401 });
  }
  if (!contact) {
    return NextResponse.json({ message: "No contact" }, { status: 401 });
  }
  if (!place) {
    return NextResponse.json({ message: "No place" }, { status: 401 });
  }

  try {


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
    return NextResponse.json({}, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};
