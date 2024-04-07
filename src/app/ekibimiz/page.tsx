import Container from "@/components/Container";
import Link from "next/link";
import { DataTable } from "./components/table/DataTable";
import prisma from "@/db/client";
import { columns } from "./components/table/EkibimizColumns";

const TherapyTypePage = async () => {
  const data = await prisma.therapy.findMany({
    select : {
      name:true,
      therapyPlace:true,
      id:true
    }
  });
  return (
    <div>
      <Container>
        <div className="flex flex-col items-center gap-5">
          <div className="w-full flex justify-end">
            <Link className="btn" href={"/ekibimiz/create"}>
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
