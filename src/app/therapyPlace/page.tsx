import Container from "@/components/Container";
import Link from "next/link";
import { DataTable } from "./components/table/DataTable";
import { columns } from "./components/table/therapyTypeColumns";
import prisma from "@/db/client";
const TherapyPlacePage = async () => {
  const data = await prisma.therapyPlace.findMany();
  return (
    <div>
      <Container>
        <div className="flex flex-col items-center gap-5">
          <div className="w-full flex justify-end">
            <Link className="btn" href={"/therapyPlace/create"}>
              Create
            </Link>
          </div>
          <DataTable columns={columns} data={data} />
        </div>
      </Container>
    </div>
  );
};

export default TherapyPlacePage;
