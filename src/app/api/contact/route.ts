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
