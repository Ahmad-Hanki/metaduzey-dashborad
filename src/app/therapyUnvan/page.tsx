import Container from "@/components/Container";
import Link from "next/link";
import { DataTable } from "./_components/table/DataTable";
import { columns } from "./_components/table/therapyUnvanColumns";
import prisma from "@/db/client";

const TherapyTypePage = async () => {
  const data = await prisma.therapyUnvan.findMany({});
  return (
    <div>
      <Container>
        <div className="flex flex-col items-center gap-5">
          <div className="w-full flex justify-end">
            <Link className="btn" href={"/therapyUnvan/create"}>
              Create
            </Link>
          </div>
          <DataTable columns={columns} data={data} />
        </div>
      </Container>
    </div>
  );
};

export default TherapyTypePage;
