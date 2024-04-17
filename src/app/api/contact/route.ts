import prisma from "@/db/client";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export const PATCH = async (req: Request) => {
  const { isAuthenticated } = getKindeServerSession();
  const auth = await isAuthenticated();
  if (!auth) {
    return NextResponse.json({ message: "Not Authenticated" }, { status: 401 });
  }

  const { id, checked } = await req.json();
  if (!id) {
    return NextResponse.json({ message: "No Client" }, { status: 404 });
  }

  try {
    await prisma.contact.update({
      where: {
        id: id,
      },
      data: {
        helped: checked,
      },
    });
    return NextResponse.json({}, { status: 200 });
  } catch (err) {
    console.log(err);
  } finally {
  }
};

export const POST = async (req: Request) => {
  const { name, email, phone, title, message } = await req.json();

  if (!name) {
    return NextResponse.json({ message: "No name" }, { status: 401 });
  }
  if (!email) {
    return NextResponse.json({ message: "No email" }, { status: 401 });
  }
  if (!phone) {
    return NextResponse.json({ message: "No Phone" }, { status: 401 });
  }
  if (!title) {
    return NextResponse.json({ message: "No Title" }, { status: 401 });
  }
  if (!message) {
    return NextResponse.json({ message: "No message" }, { status: 401 });
  }

  try {
    await prisma.contact.create({
      data: {
        name,
        email,
        phone,
        title,
        message,
      },
    });
    await prisma.$disconnect();

    return NextResponse.json({}, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};
