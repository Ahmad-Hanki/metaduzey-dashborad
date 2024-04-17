import prisma from "@/db/client";
import TherapyForm from "../_components/TherapyForm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
("../_components/TherapyForm");
const TherapyCreatePage = async () => {
  const { isAuthenticated } = getKindeServerSession();
  if (!(await isAuthenticated())) redirect("/api/auth/logout");
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
  } catch (err) {
  } finally {
    await prisma.$disconnect();
  }
};

export default TherapyCreatePage;
