import prisma from "@/db/client";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { TherapyPlace, TherapyType, TherapyUnvan } from "@prisma/client";
import { NextResponse } from "next/server";

interface TherapyTypeProps {
  params: {
    id: string;
  };
}

export async function PATCH(req: Request, { params }: TherapyTypeProps) {
  const { isAuthenticated } = getKindeServerSession();
  const auth = await isAuthenticated();

  if (!auth) {
    return NextResponse.json({ message: "Not Authenticated" }, { status: 401 });
  }

  const {
    name,
    egitim,
    lisans,
    yuksekLisans,
    terapiEgtim,
    uzmanAlan,
    summery,
    therapyTypes,
    therapyPlaces,
    therapyUnvans,
  } = await req.json();

  if (
    !name ||
    name == "" ||
    !summery ||
    summery == "" ||
    therapyTypes.length < 1 ||
    therapyPlaces.length < 1 ||
    therapyUnvans.length < 1
  ) {
    return NextResponse.json({ message: "Invalid Data" }, { status: 400 });
  }

  try {
    await prisma.therapyTypeTherapy.deleteMany({
      where: { therapyId: params.id },
    });
    await prisma.$disconnect();

    await prisma.therapyPlaceTherapy.deleteMany({
      where: { therapyId: params.id },
    });
    await prisma.$disconnect();

    await prisma.therapyUnvanTherapy.deleteMany({
      where: { therapyId: params.id },
    });
    await prisma.$disconnect();


    const createdTherapy = await prisma.therapy.update({
      where: {
        id: params.id,
      },
      data: {
        name,
        summery,
        egitim: egitim ?? null,
        lisans: lisans ?? null,
        yuksekLisans: yuksekLisans ?? null,
        terapiEgtim: terapiEgtim ?? null,
        uzmanAlan: uzmanAlan ?? null,
        therapyPlaces: {
          createMany: {
            data: therapyPlaces.map((place: TherapyType) => ({
              therapyPlaceId: place.id,
            })),
          },
        },
        therapyTypes: {
          createMany: {
            data: therapyTypes.map((type: TherapyPlace) => ({
              therapyTypeId: type.id,
            })),
          },
        },
        therapyUnvans: {
          createMany: {
            data: therapyUnvans.map((unvan: TherapyUnvan) => ({
              therapyUnvanId: unvan.id,
            })),
          },
        },
      },
      include: {
        therapyTypes: true,
        therapyPlaces: true,
        therapyUnvans: true,
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

export async function DELETE(req: Request, { params }: TherapyTypeProps) {
  const { isAuthenticated } = getKindeServerSession();
  const auth = await isAuthenticated();

  if (!auth) {
    return NextResponse.json({ message: "Not Authenticated" }, { status: 401 });
  }

  try {
    await prisma.therapy.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json({}, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 500 });
  } finally{
    await prisma.$disconnect();
  }
}
