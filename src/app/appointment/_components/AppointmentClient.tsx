"use client";

import Heading from "@/components/Heading";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";

import ApiList from "@/components/api-list";
import { Appointment } from "@prisma/client";
import { DataTable } from "./table/DataTable";
import { columns } from "./table/AppointmentColumns";
import { DatabaseIcon, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  data: (Appointment & { therapyName: string })[];
};

const AppointmentClient = ({ data }: Props) => {
  const router = useRouter();
  return (
    <>
      {" "}
      <div className="flex items-center justify-between">
        <Heading title={` Randevular (${data.length})`} description=" " />
        {/* <Button onClick={() => router.push(`/appointment/old`)}>
          <DatabaseIcon className="mr-2 h-4 w-4" />
        </Button> */}
      </div>
      <Separator />
      <DataTable columns={columns} data={data} />
      <Heading title="API" description="API calls for Place" />
      <Separator />
      <ApiList entityName="appointment" entityIdName="id" />
    </>
  );
};

export default AppointmentClient;
