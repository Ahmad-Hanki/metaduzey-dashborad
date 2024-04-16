import prisma from "@/db/client";
import TherapyTypeForm from "../_components/TherapyTypeForm";
import { redirect } from "next/navigation";

interface EditTherapyTypePageProps {
  params: {
    id: string;
  };
}

const EditTherapyTypePage = async ({ params }: EditTherapyTypePageProps) => {
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
