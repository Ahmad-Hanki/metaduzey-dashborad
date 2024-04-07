import Container from "@/components/Container";
import Link from "next/link";
import { DataTable } from "./_components/table/DataTable"; 
import { columns } from "./_components/table/therapyTypeColumns"; 
import prisma from "@/db/client";
const TherapyTypePage = async () => {
  try {
    const data = await prisma.therapyType.findMany({});

    return (
      <div>
        <Container>
          <div className="flex flex-col items-center gap-5">
            <div className="w-full flex justify-end">
              <Link className="btn" href={"/therapyType/create"}>
                Create
              </Link>
            </div>
            <DataTable columns={columns} data={data} />
          </div>
        </Container>
      </div>
    );
  } catch (err) {
    console.log(err);
  }
};

export default TherapyTypePage;
