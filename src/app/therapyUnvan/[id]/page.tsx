import prisma from "@/db/client";
import TherapyUnvanForm from "../_components/TherapyUnvanForm"; 
import { redirect } from "next/navigation";

interface EditTherapyUnvanPageProps {
  params: {
    id: string;
  };
}

const EditTherapyUnvanPage = async ({ params }: EditTherapyUnvanPageProps) => {
  const data = await prisma.therapyUnvan.findFirst({
    where: {
      id: params.id,
    },
  });

  if (!data) redirect("/therapyUnvan");
  return (
    <div>
      <TherapyUnvanForm data={data} />
    </div>
  );
};

export default EditTherapyUnvanPage;
