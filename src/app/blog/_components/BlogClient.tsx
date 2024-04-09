"use client";

import Heading from "@/components/Heading"; 
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";


import ApiList from "@/components/api-list";
import { Blog } from "@prisma/client";
import Blogs from "./Blogs";

type Props = {
  data: Blog[];
};

const BlogClient = ({ data }: Props) => {
  const router = useRouter();
  return (
    <>
      {" "}
      <div className="flex items-center justify-between">
        <Heading
          title={`Blogunuz yönetin (${data.length})`}
          description=" "
        />
        <Button onClick={() => router.push(`/blog/create`)}>
          <Plus className="mr-2 h-4 w-4" />
        </Button>
      </div>
      <Separator />
      <Blogs blogs = {data}/>
      <Heading title="API" description="API calls for Place" />
      <Separator />
      <ApiList entityName="blog" entityIdName="id" />
    </>
  );
};

export default BlogClient;
