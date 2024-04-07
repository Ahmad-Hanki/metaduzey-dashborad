import prisma from "@/db/client";
import { redirect } from "next/navigation";
import TherapyForm from "../_components/TherapyForm";

interface EditTherapyPageProps {
  params: {
    id: string;
  };
}

const EditTherapyPage = async ({ params }: EditTherapyPageProps) => {
  const data = await prisma.therapy.findFirst({
    where: {
      id: params.id,
    },
  });

  const therapyTypes = await prisma.therapyType.findMany({});
  const therapyPlace = await prisma.therapyPlace.findMany({});
  const therapyUnvan = await prisma.therapyUnvan.findMany({});

  if (!data) redirect("/therapy");
  return (
    <div>
      <TherapyForm data={data} therapyType={therapyTypes} therapyPlace={therapyPlace} TherapyUnvans={therapyUnvan}/>
    </div>
  );
};

export default EditTherapyPage;
