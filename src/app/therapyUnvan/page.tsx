import Container from "@/components/Container";
import prisma from "@/db/client";
import UnvanClient from "./_components/UnvanClient";

const TherapyTypePage = async () => {
  try {
    await prisma.$disconnect();

    const data = await prisma.therapyUnvan.findMany({});
    await prisma.$disconnect();
    return (
      <div>
        <Container>
          <div className="flex flex-col ">
            <div className="flex-1 space-y-4 p-8 pt-6">
              <UnvanClient data={data} />
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
