"use client";

import Heading from "@/components/Heading"; 
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { columns } from "./table/categoryColumns"; 

import { DataTable } from "./table/DataTable";
import ApiList from "@/components/api-list";
import { Category } from "@prisma/client";

type Props = {
  data: Category[];
};

const CategoryClient = ({ data }: Props) => {
  const router = useRouter();
  return (
    <>
      {" "}
      <div className="flex items-center justify-between">
        <Heading
          title={`Categoryninz yönetin (${data.length})`}
          description=" "
        />
        <Button onClick={() => router.push(`/blog/category/create`)}>
          <Plus className="mr-2 h-4 w-4" />
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} />
      <Heading title="API" description="API calls for Type" />
      <Separator />
      <ApiList entityName="blog/category" entityIdName="id" />
    </>
  );
};

export default CategoryClient;
