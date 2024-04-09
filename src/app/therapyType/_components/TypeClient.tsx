"use client";

import Heading from "@/components/Heading"; 
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { columns } from "./table/therapyTypeColumns"; 

import { DataTable } from "./table/DataTable";
import ApiList from "@/components/api-list";
import { TherapyType } from "@prisma/client";

type Props = {
  data: TherapyType[];
};

const TypeClient = ({ data }: Props) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      {" "}
      <div className="flex items-center justify-between">
        <Heading
          title={`Türünüz yönetin (${data.length})`}
          description=" "
        />
        <Button onClick={() => router.push(`/therapyType/create`)}>
          <Plus className="mr-2 h-4 w-4" />
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} />
      <Heading title="API" description="API calls for Type" />
      <Separator />
      <ApiList entityName="therapyType" entityIdName="id" />
    </>
  );
};

export default TypeClient;
