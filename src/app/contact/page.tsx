import Container from "@/components/Container";
import prisma from "@/db/client";
import ContactClient from "./_components/ContactClient";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

const Appointment = async () => {
  const { isAuthenticated } = getKindeServerSession();
  if (!(await isAuthenticated())) redirect("/api/auth/logout");
  try {
    const data = await prisma.contact.findMany({
      orderBy: {
        CreatedAt: "desc",
      },
    });
    await prisma.$disconnect();

    return (
      <div>
        <Container>
          <div className="flex flex-col ">
            <div className="flex-1 space-y-4 p-8 pt-6">
              <ContactClient data={data} />
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

export default Appointment;
