import prisma from "@/db/client";
import BlogForm from "../_components/BlogForm";
import { redirect } from "next/navigation";

interface BlogIdPageProps {
  params: {
    id: string;
  };
}

const EditBlog = async ({ params }: BlogIdPageProps) => {
  

  
  const blog = await prisma.blog.findFirst({
    where: {
      id: params.id,
    },
  });
  

  if (!blog) redirect("/blog");

  const blogs = await prisma.blog.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      imageUrl: true,
    },
  });
  

  const category = await prisma.category.findMany({});
  

  return (
    <div>
      <BlogForm category={category} prevImages={blogs} initialData={blog} />
    </div>
  );
}



export default EditBlog;
