import Container from "@/components/Container";
import prisma from "@/db/client";
import TypeClient from "./_components/TypeClient"; 

const TherapyTypePage = async () => {

  
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



};

export default TherapyTypePage;
