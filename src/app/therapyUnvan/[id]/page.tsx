import prisma from "@/db/client";
import TherapyUnvanForm from "../_components/TherapyUnvanForm";
import { redirect } from "next/navigation";

interface EditTherapyUnvanPageProps {
  params: {
    id: string;
  };
}

const EditTherapyUnvanPage = async ({ params }: EditTherapyUnvanPageProps) => {
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
