import prisma from "@/db/client";
import TherapyTypeForm from "../_components/TherapyTypeForm";
import { redirect } from "next/navigation";
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
    const data = await prisma.therapyType.findFirst({
      where: {
        id: params.id,
      },
    });
    await prisma.$disconnect();

    if (!data) redirect("/therapyType");
    return (
      <div>
        <TherapyTypeForm data={data} />
      </div>
    );
  } catch (err) {
  } finally {
    await prisma.$disconnect();
  }
};

export default EditTherapyTypePage;
