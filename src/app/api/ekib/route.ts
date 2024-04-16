import prisma from "@/db/client";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { TherapyPlace, TherapyType, TherapyUnvan } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
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
    const createdTherapy = await prisma.therapy.create({
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
  
    return NextResponse.json({}, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Something Went Wrong" },
      { status: 500 }
    );
  } finally{
    }
}


export async function GET(req: Request) {
  try {
    const therapy = await prisma.therapy.findMany({
      include: {
        therapyPlaces:{
          select:{
            therapyPlace:true
          }
        },
        therapyTypes:{
          select:{
            therapyType:true
          }
        },
        therapyUnvans:{
          select:{
            therapyUnvan:true
          }
        }
      }
    }) 
  
    return NextResponse.json(therapy, { status: 200 });

  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Something Went Wrong..." },
      { status: 500 }
    );
  } 
}