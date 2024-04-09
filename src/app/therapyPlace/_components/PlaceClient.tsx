"use client";

import Heading from "@/components/Heading"; 
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { columns } from "./table/therapyTypeColumns";  

import { DataTable } from "./table/DataTable"; 
import ApiList from "@/components/api-list";
import { TherapyPlace } from "@prisma/client";

type Props = {
  data: TherapyPlace[];
};

const PlaceClient = ({ data }: Props) => {
  const router = useRouter();
  return (
    <>
      {" "}
      <div className="flex items-center justify-between">
        <Heading
          title={`Yeriniz yönetin (${data.length})`}
          description=" "
        />
        <Button onClick={() => router.push(`/therapyPlace/create`)}>
          <Plus className="mr-2 h-4 w-4" />
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} />
      <Heading title="API" description="API calls for Place" />
      <Separator />
      <ApiList entityName="therapyPlace" entityIdName="id" />
    </>
  );
};

export default PlaceClient;
