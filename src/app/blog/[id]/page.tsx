import prisma from "@/db/client";
import BlogForm from "../_components/BlogForm";
import { redirect } from "next/navigation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

interface BlogIdPageProps {
  params: {
    id: string;
  };
}

const EditBlog = async ({ params }: BlogIdPageProps) => {
  const { isAuthenticated } = getKindeServerSession();
  if (!(await isAuthenticated())) redirect("/api/auth/logout");

  try{
  const blog = await prisma.blog.findFirst({
    where: {
      id: params.id,
    },
  });
  
  await prisma.$disconnect()

  if (!blog) redirect("/blog");

  const blogs = await prisma.blog.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      imageUrl: true,
    },
  });
  await prisma.$disconnect()


  const category = await prisma.category.findMany({});
  await prisma.$disconnect()


  return (
    <div>
      <BlogForm category={category} prevImages={blogs} initialData={blog} />
    </div>
  );
} catch(err) {

} finally{
  await prisma.$disconnect()

}
}



export default EditBlog;
