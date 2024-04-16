import Container from "@/components/Container";
import prisma from "@/db/client";
import EkibClient from "./_components/EkibColumns";

const TherapyPage = async () => {
  
  
  const data = await prisma.therapy.findMany({
    select: {
      id: true,
      name: true,
      imageUrl:true,
      therapyPlaces: {
        // Include the TherapyPlaces relation
        select: {
          therapyPlace: {
            // Include the associated therapyPlace
            select: {
              name: true,
            },
          },
        },
      },
      therapyTypes: {
        select: {
          therapyType: {
            select: {
              name: true,
            },
          },
        },
      },
      therapyUnvans: {
        select: {
          therapyUnvan: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });


  return (
    <div>
      <Container>
        <div className="flex flex-col ">
          <div className="flex-1 space-y-4 p-8 pt-6">
            <EkibClient data={data} />
          </div>
        </div>
      </Container>
    </div>
  );

};

export default TherapyPage;
