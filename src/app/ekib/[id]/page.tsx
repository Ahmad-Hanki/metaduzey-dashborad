import prisma from "@/db/client";
import { redirect } from "next/navigation";
import TherapyForm from "../_components/TherapyForm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

interface EditTherapyPageProps {
  params: {
    id: string;
  };
}

const EditTherapyPage = async ({ params }: EditTherapyPageProps) => {
  const { isAuthenticated } = getKindeServerSession();
  if (!(await isAuthenticated())) redirect("/api/auth/logout");
  try {
    const data = await prisma.therapy.findFirst({
      where: {
        id: params.id,
      },
    });
    await prisma.$disconnect();

    const therapyTypes = await prisma.therapyType.findMany({});
    await prisma.$disconnect();

    const therapyPlace = await prisma.therapyPlace.findMany({});
    await prisma.$disconnect();

    const therapyUnvan = await prisma.therapyUnvan.findMany({});
    await prisma.$disconnect();

    if (!data) redirect("/therapy");
    return (
      <div>
        <TherapyForm
          initialData={data}
          therapyType={therapyTypes}
          therapyPlace={therapyPlace}
          TherapyUnvans={therapyUnvan}
        />
      </div>
    );
  } catch (err) {
  } finally {
    await prisma.$disconnect();
  }
};

export default EditTherapyPage;
