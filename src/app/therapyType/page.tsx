import Container from "@/components/Container";
import prisma from "@/db/client";
import TypeClient from "./_components/TypeClient";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

const TherapyTypePage = async () => {
  const { isAuthenticated } = getKindeServerSession();
  if (!(await isAuthenticated())) redirect("/api/auth/logout");
  try {
    const data = await prisma.therapyType.findMany({});
    return (
      <div>
        <Container>
          <div className="flex flex-col ">
            <div className="flex-1 space-y-4 p-8 pt-6">
              <TypeClient data={data} />
            </div>
          </div>
        </Container>
      </div>
    );
  } catch (err) {
  } finally {
    await prisma.$disconnect();
  }
};

export default TherapyTypePage;
