import prisma from "@/db/client";
import TherapyForm from "../_components/TherapyForm";
("../_components/TherapyForm");
const TherapyCreatePage = async () => {
  try {

  
  const therapyTypes = await prisma.therapyType.findMany({});
  await prisma.$disconnect();
  const therapyPlace = await prisma.therapyPlace.findMany({});
  await prisma.$disconnect();
  const therapyUnvan = await prisma.therapyUnvan.findMany({});
  await prisma.$disconnect();

  return (
    <div>
      <TherapyForm
        therapyType={therapyTypes}
        TherapyUnvans={therapyUnvan}
        therapyPlace={therapyPlace}
      />
    </div>
  );
} catch(err) {

} finally {
  await prisma.$disconnect();
}
};

export default TherapyCreatePage;
