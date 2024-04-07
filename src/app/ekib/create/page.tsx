import prisma from "@/db/client";
import TherapyForm from "../_components/TherapyForm";
("../_components/TherapyForm");
const TherapyCreatePage = async () => {
  const therapyTypes = await prisma.therapyType.findMany({});
  const therapyPlace = await prisma.therapyPlace.findMany({});
  const therapyUnvan = await prisma.therapyUnvan.findMany({});

  return (
    <div>
      <TherapyForm
        therapyType={therapyTypes}
        TherapyUnvans={therapyUnvan}
        therapyPlace={therapyPlace}
      />
    </div>
  );
};

export default TherapyCreatePage;
