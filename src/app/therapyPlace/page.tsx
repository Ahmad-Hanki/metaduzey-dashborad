import Container from "@/components/Container";
import prisma from "@/db/client";
import PlaceClient from "./_components/PlaceClient";

const TherapyTypePage = async () => {

    const data = await prisma.therapyPlace.findMany({});

    return (
      <div>
        <Container>
          <div className="flex flex-col ">
            <div className="flex-1 space-y-4 p-8 pt-6">
              <PlaceClient data={data} />
            </div>
          </div>
        </Container>
      </div>
    );
 
};

export default TherapyTypePage;
