"use client";

import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import ApiList from "@/components/api-list";
import Blogs from "./Blogs";



type BlogClient = {
  data: ({
    blogCategories: {
        category: {
            name: string;
        };
    }[];
} & {
    id: string;
    title: string;
    summery: string;
    yazan: string;
    imageUrl: string;
    createdAt: Date;
    updatedAt: Date;
})[]
};

const BlogClient = ({ data }: BlogClient) => {
  const router = useRouter();
  return (
    <>
      {" "}
      <div className="flex items-center justify-between">
        <Heading title={`Blogunuz yönetin (${data.length})`} description=" " />
        <Button onClick={() => router.push(`/blog/create`)}>
          <Plus className="mr-2 h-4 w-4" />
        </Button>
      </div>
      <Separator />
      <Blogs blogs={data} />
      <Heading title="API" description="API calls for Place" />
      <Separator />
      <ApiList entityName="blog" entityIdName="id" />
    </>
  );
};

export default BlogClient;
