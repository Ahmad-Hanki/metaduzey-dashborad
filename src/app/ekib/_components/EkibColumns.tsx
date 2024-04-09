"use client";

import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { columns } from "./table/EkibColumn";

import { DataTable } from "./table/DataTable";
import ApiList from "@/components/api-list";

type TherapyData = {
  id: string; // Change id type to string
  name: string;
  imageUrl: string;
  therapyPlaces: {
    therapyPlace: {
      name: string;
    };
  }[];
  therapyTypes: {
    therapyType: {
      name: string;
    };
  }[];
  therapyUnvans: {
    therapyUnvan: {
      name: string;
    };
  }[];
};

type Props = {
  data: TherapyData[];
};

const EkibClient = ({ data }: Props) => {
  const router = useRouter();

  const formedData = data.map((item) => ({
    id: item.id,
    imageUrl: item.imageUrl,
    name: item.name,
    therapyPlace: item.therapyPlaces.map((tp) => tp.therapyPlace.name),
    therapyType: item.therapyTypes.map((tp) => tp.therapyType.name),
    therapyUnvan: item.therapyUnvans.map((tp) => tp.therapyUnvan.name),
  }));

  return (
    <>
      {" "}
      <div className="flex items-center justify-between">
        <Heading title={`Ekibiniz yönetin (${data.length})`} description=" " />
        <Button onClick={() => router.push(`/therapy/create`)}>
          <Plus className="mr-2 h-4 w-4" />
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={formedData} />
      <Heading title="API" description="API calls for Therapy" />
      <Separator />
      <ApiList entityName="therapy" entityIdName="id" />
    </>
  );
};

export default EkibClient;
