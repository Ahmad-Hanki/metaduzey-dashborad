import prisma from "@/db/client";
import { redirect } from "next/navigation";
import TherapyPlaceForm from "../_components/TherapyPlaceForm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

interface EditTherapyTypePageProps {
  params: {
    id: string;
  };
}

const EditTherapyTypePage = async ({ params }: EditTherapyTypePageProps) => {
  const { isAuthenticated } = getKindeServerSession();
  if (!(await isAuthenticated())) redirect("/api/auth/logout");
  try {
    const data = await prisma.therapyPlace.findFirst({
      where: {
        id: params.id,
      },
    });
    await prisma.$disconnect();

    if (!data) redirect("/therapyPlace");
    return (
      <div>
        <TherapyPlaceForm data={data} />
      </div>
    );
  } catch (err) {
  } finally {
    await prisma.$disconnect();
  }
};

export default EditTherapyTypePage;
