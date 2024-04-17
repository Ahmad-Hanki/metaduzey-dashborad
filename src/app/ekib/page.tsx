import Container from "@/components/Container";
import prisma from "@/db/client";
import EkibClient from "./_components/EkibColumns";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

const TherapyPage = async () => {
  const { isAuthenticated } = getKindeServerSession();
  if (!(await isAuthenticated())) redirect("/api/auth/logout");
  try {
    const data = await prisma.therapy.findMany({
      select: {
        id: true,
        name: true,
        imageUrl: true,
        therapyPlaces: {
          // Include the TherapyPlaces relation
          select: {
            therapyPlace: {
              // Include the associated therapyPlace
              select: {
                name: true,
              },
            },
          },
        },
        therapyTypes: {
          select: {
            therapyType: {
              select: {
                name: true,
              },
            },
          },
        },
        therapyUnvans: {
          select: {
            therapyUnvan: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    await prisma.$disconnect();

    return (
      <div>
        <Container>
          <div className="flex flex-col ">
            <div className="flex-1 space-y-4 p-8 pt-6">
              <EkibClient data={data} />
            </div>
          </div>
        </Container>
      </div>
    );
  } catch (err) {
  } finally {
    await prisma.$disconnect();
  }
};

export default TherapyPage;
