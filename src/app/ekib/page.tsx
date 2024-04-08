import Container from "@/components/Container";
import Link from "next/link";
import { DataTable } from "./_components/table/DataTable";
import { columns } from "./_components/table/EkibColumn";
import prisma from "@/db/client";

const TherapyPage = async () => {
  const data = await prisma.therapy.findMany({
    select: {
      id: true,
      name: true,
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

  const formedData = data.map((item) => ({
    id: item.id,
    name: item.name,
    therapyPlace: item.therapyPlaces.map((tp) => tp.therapyPlace.name),
    therapyType: item.therapyTypes.map((tp) => tp.therapyType.name),
    therapyUnvan: item.therapyUnvans.map((tp) => tp.therapyUnvan.name),
  }));
  return (
    <div>
      <Container>
        <div className="flex flex-col items-center gap-5">
          <div className="w-full flex justify-end">
            <Link className="btn" href={"/ekib/create"}>
              Create
            </Link>
          </div>
          <DataTable columns={columns} data={formedData} />
        </div>
      </Container>
    </div>
  );
};

export default TherapyPage;
