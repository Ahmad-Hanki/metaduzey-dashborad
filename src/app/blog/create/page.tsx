import prisma from "@/db/client";
import BlogForm from "../_components/BlogForm";

const CreateBlog = async () => {

  
  const blogs = await prisma.blog.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      imageUrl:true
    }
  });
  
  const category = await prisma.category.findMany({})
  return (
    <div>
      <BlogForm category={category} prevImages={blogs} blog={true}/>
    </div>
  );

};

export default CreateBlog;
