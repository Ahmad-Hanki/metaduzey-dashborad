import prisma from "@/db/client";
import TherapyUnvanForm from "../_components/TherapyUnvanForm";
import { redirect } from "next/navigation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

interface EditTherapyUnvanPageProps {
  params: {
    id: string;
  };
}

const EditTherapyUnvanPage = async ({ params }: EditTherapyUnvanPageProps) => {
  const { isAuthenticated } = getKindeServerSession();
  if (!(await isAuthenticated())) redirect("/api/auth/logout");
  try {
    const data = await prisma.therapyUnvan.findFirst({
      where: {
        id: params.id,
      },
    });
    await prisma.$disconnect();

    if (!data) redirect("/therapyUnvan");
    return (
      <div>
        <TherapyUnvanForm data={data} />
      </div>
    );
  } catch (err) {
  } finally {
    await prisma.$disconnect();
  }
};

export default EditTherapyUnvanPage;
